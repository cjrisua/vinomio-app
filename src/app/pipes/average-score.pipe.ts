import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'averageScore'
})
export class AverageScorePipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): number {
    const scores = value.map((r:any) => r.score)
    if(scores.length>0)
      return scores.reduce((a:any,b:any)=>a+b,0)/scores.length
    return 0;
  }

}
