using System;
using System.Collections.Generic;

namespace BLogic.Models
{
    public class Bot
    {
        private int mistakesToMake = 2;
        private int timeToProvideAnswer;
        private int tickAnswer;

        private void SetNewTickAnswer()
        {
            var random = new Random();
            this.tickAnswer = this.timeToProvideAnswer - random.Next(2, 7);
        }

        public void HandleTimerStarted(int timeToProvideAnswer)
        {
            this.timeToProvideAnswer = timeToProvideAnswer;
            SetNewTickAnswer();
        }

        // Гавнокод
        public string HandleTimerTick(int currentTick, List<TranslateVariant> variants)
        {
            if (currentTick == 0)
            {
                throw new ArgumentOutOfRangeException(nameof(currentTick));
            }

            var variantsNum = variants.Count;
            var correctVarNum = variants.FindIndex(value => value.IsCorrect);

            if (currentTick == tickAnswer)
            {
                var random = new Random();
                SetNewTickAnswer();
                if (mistakesToMake != 0
                    && random.NextDouble() > 0.65)
                {
                    // in 0.64^5 = 12% games bot will not make any mistakes
                    this.mistakesToMake--;

                    var incorrectVariants = new List<TranslateVariant>();
                    for (var i = 0; i < variantsNum; i++)
                    {
                        if (i != correctVarNum)
                        {
                            incorrectVariants.Add(variants[i]);
                        }
                    }

                    return incorrectVariants[random.Next(0, 3)].VariantDef;
                }
                else
                {
                    return variants[correctVarNum].VariantDef;
                }
            }

            return null;
        }
    }
}
