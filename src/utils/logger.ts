

const info = (...params:any) => {
  if(process.env.NODE_ENV!=='prod'){
    console.log(...params)
  }
}

const error = (...params:any) => {
    if(process.env.NODE_ENV!=='prod'){
    console.error(...params)
    }
}

export default  {
  info, error
}