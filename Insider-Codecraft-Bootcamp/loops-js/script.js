let i;
// for(i = 0; i < 5; i++){
//     console.log(i);
// }
//i = 0;
// console.log(i);
// while(i < 5){
//     console.log(i);
//     i++;
// }
i=0;
// do {
//     console.log(i);
//     i++;
// }
// while(i < 5);

//for..in
// const person = {
//     name: 'Deniz',
//     age: 26,

// };
//destructing
// const { name } = person;

//for in
// for(let key in person){
//     console.log(key, person[key]);
// }

// console.log(Object.keys(person));
// console.log(Object.values(person));
//for of
// const numbers = [1, 2, 5, 7, 10];
// for(let number of numbers) {
//     console.log(number);
// }

//for each arrayler üzerinden geçen bir döngü olduğu için javascriptte yok.

// const numbers = [1, 2, 5, 7, 10];
// for(let index = 0; index < numbers.length; index++){
//     if(numbers[index] > 5){
//     break;//continue
// }
// console.log(numbers[index]);
// }

//-Self Invoking Function IIFE Function
// (() => {
//     console.log("Hello World");
// })();

//OOP Formatına çevirmek için;
((self) => {
    self.init = () => {
        self.getUserData();
        console.log("Hello");
    };
self.getUserData = () => {
    console.log("User data is coming");
};
self.init();
})({});



