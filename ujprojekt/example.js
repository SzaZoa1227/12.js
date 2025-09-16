import input from './input.js'

const main = async () => {
    let name = await input("Enter your name: ")
    console.log(`Hello, ${name}!`)
}

main()
