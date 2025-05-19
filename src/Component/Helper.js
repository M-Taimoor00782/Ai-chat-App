export const checkHeading = (str) =>{
    return /^(\*)(\*)(.*)\*$/.test(str)
}

export const replaceHeading = (str) =>{
    return str.replace(/^(\*)(\*)|(\*)$/g, '')
}