export type Observer = ((text: string) => void) | null

export class TextScramble {
    private chars = '!<>-_\\/[]{}—=+*^?#________'

    private resolve!: (value?: unknown) => void

    private queue: { from: string; to: string; start: number; end: number; char?: string }[] = []

    private frame!: number

    private frameRequest!: number

    /**
     * Observers.
     */
    private observers: Observer[] = []

    public text: string = ''

    constructor() {
        this.update = this.update.bind(this);
    }

    public observe(observer: Observer): () => void {
        this.observers.push(observer)

        this.emitChange()

        return (): void => {
            this.observers = this.observers.filter((_observer) => _observer !== observer)
        }
    }

    public setText(oldText: string, newText: string) {
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => this.resolve = resolve);

        this.queue = [];

        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * Math.min(30, newText.length));
            const end = Math.floor(Math.random() * Math.min(30, newText.length)) + start;

            this.queue.push({
                from,
                to,
                start,
                end
            });
        }

        cancelAnimationFrame(this.frameRequest);

        this.frame = 0;

        this.update()

        return promise;
    }

    private update() {
        let output = '';
        let complete = 0;

        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];

            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }

                output += char;
            } else {
                output += from;
            }
        }

        this.text = output;

        this.emitChange()

        if (complete === this.queue.length) {
            this.resolve();
        } else {
            setTimeout(() => {
                this.frameRequest = requestAnimationFrame(this.update);
                this.frame++;
            }, 20);
        }
    }

    private randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)]
    }

    private emitChange() {
        this.observers.forEach(observer => observer && observer(this.text))
    }
}
