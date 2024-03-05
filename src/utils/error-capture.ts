import { ZodError } from "zod";

interface IErrorCapturer{

     getErrors(e:unknown): string
} 

export class ZodErrorCapturer implements IErrorCapturer{

   getErrors(e:unknown): string {

        let errors=[]

                if (e instanceof ZodError) {
                  
                    for (let error of e.errors){
                        const variableName = error.path[0];
                          const errorMessage = error.message;
                          
                          errors.push({ [variableName]: errorMessage });
                    }
                }

      return JSON.stringify(errors)
              
  }
  
}

