
// // 29
// var array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
// for(let i=0; i<array.length; i++) {
//     array[i] = Math.pow(array[i], 2);
// }
// array;   // [ 0, 1, 4, 9, 16, 25, 36, 49, 64, 81 ]


// [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(
//     function(num) {
//         return Math.pow(num, 2);
//     }
// );

// [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => Math.pow(num, 2));



// var counter = 0;

// function increment() {
//     return ++counter;
// }

// var increment = counter => counter + 1;



// increment();
// increment();
// print(counter); 

// var plus2 = run(increment, increment);
// print(plus2(0));

// 37
// var input = [80, 90, 100];
// var sum = (total, current) => total + current;
// var total = arr => arr.reduce(sum);
// var size = arr => arr.length;
// var divide = (a, b) => a / b;
// var average = arr => divide(total(arr), size(arr));
// average(input);


// var sortDesc = arr => {
//     arr.sort(
//         (a, b) => b - a
//     );
// };

// var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
// sortDesc(arr);

// 41
// let enrollment = [
//     {enrolled: 2, grade: 100},
//     {enrolled: 2, grade: 80},
//     {enrolled: 1, grade: 89}
// ];


// var totalGrades = 0;
// var totalStudentsFound = 0;
// for (let i = 0; i < enrollment.length; i++) {
//     let student = enrollment[i];
//     if( student !== null ) {
//         if (student.enrolled > 1) {
//             totalGrades += student.grade;
//             totalStudentsFound++;
//         }
//     }
// }
// var average = totalGrades / totalStudentsFound; //-> 90
