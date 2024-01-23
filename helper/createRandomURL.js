const randomUrl = async ()=>{
    let randomVariables = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    let maxLength = process.env.MAX_URL_LENGTH;
    let result="";
    for (let index = 0; index < maxLength; index++) {
        let randomIndex=Math.floor(Math.random()*randomVariables.length);
        result += randomVariables[randomIndex];
    }
    return result;
}
module.exports = randomUrl;