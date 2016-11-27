module Models {
    export class Bot {
        private mistakesToMake: number;
        private timeToProvideAnswer: number;
        private tickAnswer: number;

        constructor() {
            this.mistakesToMake = 2;
        }

        private setNewTickAnswer(): void {
            this.tickAnswer = this.timeToProvideAnswer - Math.floor(Math.random() * 5);
            if (this.tickAnswer >= this.timeToProvideAnswer - 1) {
                this.tickAnswer = this.timeToProvideAnswer - 2;
            }
        }

        public handleTimerStarted(timeToProvideAnswer): void {
            this.timeToProvideAnswer = timeToProvideAnswer;
            this.setNewTickAnswer();
        }

        public handleTimerTick(currentTick: number, variants: Array<Models.TranslateVariant>): string  {
            if (currentTick === 0) {
                throw new Error("smth bad with bot game logic");
            }

            let variantsNum = variants.length;
            let correctVarNum = variants.findIndex(value => value.isTrue === true);

            if (currentTick === this.tickAnswer) {
                this.setNewTickAnswer();
                if (this.mistakesToMake !== 0
                    && Math.random() > 0.65) { // in 0.64^5 = 12% games bot will not make any mistakes
                    this.mistakesToMake--;

                    let incorrectVariants = [];
                    for (let i = 0; i < variantsNum; i++) {
                        if (i !== correctVarNum) {
                            incorrectVariants.push(i);
                        }
                    }

                    let index = incorrectVariants[Math.floor(Math.random() * 3)];
                    return variants[index].variant;
                } else {
                    return variants[correctVarNum].variant;
                }
            }

            return null;
        }
    }
}