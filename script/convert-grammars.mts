import path from 'node:path'
import fs from 'node:fs/promises'
import yaml from 'js-yaml'

const sourceDir = path.join(import.meta.dirname, '../source/grammars')
const outputDir = path.join(import.meta.dirname, '../languages/grammars')
let signal: AbortSignal | undefined = undefined

debugger
try {
    console.group('Converting...')
    await fs.mkdir(outputDir, { recursive: true })
    for await (const filename of fs.glob('*.yaml', { cwd: sourceDir }))
        await convert(filename)
    console.groupEnd()

    if (process.argv[2] === '--watch') {
        console.log("Watching...")
        const ac = new AbortController()
        signal = ac.signal
        process.once('SIGINT', () => ac.abort('*** Stopped'))

        const watcher = fs.watch(sourceDir, { signal })
        const changes: Record<string, number> = {}
        for await (const { eventType, filename } of watcher) {
            if (eventType === 'change' && filename?.endsWith('.yaml')) {
                const { mtimeMs } = await fs.stat(path.join(sourceDir, filename))
                if (changes[filename] === mtimeMs)
                    continue
                changes[filename] = mtimeMs
                await convert(filename)
            }
        }
    }

    async function convert(filename: string) {
        console.log(filename)

        const sourceFile = path.join(sourceDir, filename)
        const parsed = yaml.load(await fs.readFile(sourceFile, 'utf-8'), { filename })

        const outputFile = path.join(outputDir, filename.replace(/\.yaml$/, '.json'))
        const json = JSON.stringify(parsed, undefined, 2)
        await fs.writeFile(outputFile, json)
    }
}
catch (e) {
    if (signal?.aborted)
        console.log(signal.reason)
    else {
        console.error(e instanceof Error ? e.message : String(e))
        process.exitCode = 1
    }
}
