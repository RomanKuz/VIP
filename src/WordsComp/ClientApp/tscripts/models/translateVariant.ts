module Models {
    export class TranslateVariant {
        constructor() {
            this.variant = null;
            this.isTrue = false;
            this.isSelected = false;
        }

        public variant: string;

        public isTrue: boolean;

        public isSelected: boolean;

        public order: number;
    }
}