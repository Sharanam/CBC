// let url = "https://jsonplaceholder.typicode.com/todos";


// export const signin = () => {
//     try {
//         return fetch(
//             url, {
//             method: "GET"
//         }).then(response => response.json())
//     }
//     catch (err) {
//         return err
//     }
// }


let url=
"https://sharanam-cbc-pqrqpw6637vj5-3500.githubpreview.dev/api/signin"

export const signin = (data = {}, options = {}) => {
    return fetch(
        url, {
        method: "POST",
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data),
        ...options
    }).then(response => response.json())
        .catch((err) => err)
}
// signin().then(console.log).catch(console.error)