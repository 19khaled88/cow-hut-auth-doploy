type IOptions ={
    page?:number
    limit?:number
}

type IOptionReturn ={
    page:number 
    limit:number
    skip:number
}
const calculatePagination = (options:IOptions):IOptionReturn=>{
    const page = Number(options.page || 1)
    const limit = Number(options.limit || 10)

    const skip = (page -1) * limit 

    return {
        page,limit,skip
    }
}

export const PaginationHelper = {
    calculatePagination
}