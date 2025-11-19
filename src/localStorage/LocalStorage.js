const get = key=>{
  const value = JSON.parse(localStorage.getItem(key))
  if(value){
    return value;
  }
  return [];
}

const set = (key,value)=>{
  localStorage.setItem(key,JSON.stringify(value))
}

export {get,set}