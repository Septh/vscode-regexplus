import path from 'node:path'
import fs from 'node:fs/promises'
import yaml from 'js-yaml'
import { styleText } from 'node:util'

const sourceDir = path.join(import.meta.dirname, '../source/grammars')
const outputDir = path.join(import.meta.dirname, '../languages/grammars')
let signal: AbortSignal | undefined = undefined

debugger
try {
    console.log('Reading source directory', styleText('yellow', displayName(sourceDir)))
    await fs.mkdir(outputDir, { recursive: true })
    for await (const filename of fs.glob('*.yaml', { cwd: sourceDir }))
        await convert(filename)

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
        const sourceFile = path.join(sourceDir, filename)
        const raw = await fs.readFile(sourceFile, 'utf-8')

        console.group('Converting', styleText('yellow', displayName(sourceFile)))
        if (filename === 'regex+.tmLanguage.yaml') {
            // Doing a straight read/convert/write for the main language file.
            const parsed = yaml.load(raw, { filename })
            const json = JSON.stringify(parsed, undefined, 2)

            const outputFile = path.join(outputDir, 'regex+.tmLanguage.json')
            console.log('Writing', styleText('blue', displayName(outputFile)))
            await fs.writeFile(outputFile, json)
        }
        else if (filename === 'injections.tmLanguage.yaml') {
            // One source to inject them all.
            for (const ext of [ "ts", "tsx", "js", "jsx" ]) {
                const replaced = raw.replaceAll('$host-language$', ext)
                const parsed = yaml.load(replaced, { filename })
                const json = JSON.stringify(parsed, undefined, 2)

                const outputFile = path.join(outputDir, `injection.${ext}.tmLanguage.json`)
                console.log('Writing', styleText('blue', displayName(outputFile)))
                await fs.writeFile(outputFile, json)
            }
        }
        console.groupEnd()
    }

    function displayName(filename: string) {
        return path.relative(process.cwd(), filename)
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
