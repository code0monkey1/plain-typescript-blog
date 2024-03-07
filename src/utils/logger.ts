

const info = (...params:any) => {
  if(process.env.NODE_ENV==='dev'){
    console.log(...params)
  }
}

const error = (...params:any) => {
    if(process.env.NODE_ENV==='dev'){
    console.error(...params)
    }
}

export default  {
  info, error
}