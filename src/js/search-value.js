
export class searchValue {
    constructor() {
        this.value = '';
    }
    static checkInputValue(data) {
        const tmpValue = data.replace(/^\s+|\s+$/gm, '');
        const arrayValue = [...tmpValue];
        const min = 1;
        const max = 100;
        if (arrayValue.length <= min || arrayValue.length > max) {
            return false;
        }
        this.setValue(tmpValue);
        return true;
    }
    setValue(incomValue) {
        this.value = incomValue;
        return;
    }
    static setValue(incomValue) {
        this.value = incomValue;
        return;
    }
    static getValue() {
        return this.value;
    }
}
