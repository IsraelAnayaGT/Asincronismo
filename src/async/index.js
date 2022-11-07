const fnAsync = () => {
    return new Promise((resolve, reject)=>{
        (true)
        ?setTimeout(()=> resolve("Async"),2000)
        :reject (new error("Error"));
    });
}

const anotherFn = async () => {
    const something = await fnAsync();
    console.log(something);
    console.log("Hello");
}

console.log("Berfore");
anotherFn();
console.log("After");