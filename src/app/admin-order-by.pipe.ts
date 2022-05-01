import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'adminOrderBy'
})
export class AdminOrderByPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): any[] {
    const itemToFind = "id";
    const foundId = value.findIndex((el:any) => el.key == itemToFind)
    //move id to the top
    if(foundId != -1 && foundId != 0){
      const newitem = value.splice(foundId, 1)
      value.unshift(newitem[0])
    }

    const createdAt = value.findIndex((el:any) => el.key == "createdAt")
    if(createdAt != -1 && createdAt != (value.length-2)){
      //console.log("move-createdAt")
      const newitem = value.splice(createdAt, 1)
      value.push(newitem[0])
      //console.log(`${createdAt} ${value.length-2}`)
    }
    const updatedAt = value.findIndex((el:any) => el.key == "updatedAt")
    if(updatedAt != -1 && updatedAt != (value.length-1)){
      //console.log("move-updatedAt")
      const newitem = value.splice(updatedAt, 1)
      value.push(newitem[0])
    }
    return value;
  }

}
