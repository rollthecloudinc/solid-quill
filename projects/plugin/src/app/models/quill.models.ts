export class QuillViewItem {
    token: string;
    constructor(data?: QuillViewItem) {
        if (data) {
            this.token = data.token ? data.token : '';
        }
    }
}