export class ApplicationException extends Error {
    status: number;
     constructor(message: string = 'An error ocurred', status=400) {
         super(message)
         this.status = status
     }
 }

