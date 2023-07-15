import { fetchData } from "./Utils";

function disblayData(data) {
  console.log(data);
}

//disblayData(result);
function getNames(results) {
  //console.log(results);
  const names = results.map((result) => {
    const { name } = result;
    const nameFormat = result.name.title + ". " + name.first + " " + name.last;
    return nameFormat;
  });

  console.log(names);
}
//const result = fetchData().then(getNames);
/////////////////////////////////////////////////////////////////////

function convertdobProp(results) {
  //  console.log(results); why this also without dob ?
  //console.log(result.dob.age + result.dob.date);

  results.forEach((result) => {
    // console.log(result.dob.age + result.dob.date);
    result[result.dob.age] = result.dob.date;
    delete result.dob;
  });
  console.log(results);
}

//const result2 = fetchData().then(convertdobProp);
//const r = getNames(fetchData());
//////////////////////////////////////////////////////////////////

const ageSum = (results) => {
  console.log(results);
  let sum = 0;
  results.forEach((result) => {
    sum = sum + result.dob.age;
  });
  console.log(sum);
  return sum;
};
//const sum = fetchData().then(ageSum);
/////////////////////////////////////////////////////////////////

function asyncCall() {
  var result = null;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      result = "data";
      resolve(result);
    }, 3000);
  });
}

async function main() {
  let result = asyncCall().then(disblayData);
}
// alter asyncCall function in which the data returned be not null

//disblayData(v);
/////////////////////////////////////////////////////////////////////

function bar(a) {
  this.a = a; //this -> window not obj  because we call bar within global (default call)(before using answer stetmant in foo())
}

function foo(a) {
  // bar(a); //global call  default
  // this here -> obj  because we call foo within obj (implicit)
  this.bar(a); // answer
}

var obj = {
  bar: bar,
  foo: foo,
};

obj.foo(5); // implicit
//console.log(obj.a);

//console.log(window.a);
// ?? what is the output, if it undefined (why) how can
// we make it to be 5
//answer : the output is undefined , because we need to print the obj.a , but we dont have 'a' prop in obj ,
//this.a in bar function , here this -> window not obj , because when and how  we call  function bar? in foo function , and in foo function
//we call bar as default not as implicit (bar(a)) , to solve it and make it to be 5 , i change the calling bar function inside foo function  from default to implicit
// using (this.bar(a)) -> this inside foo() -> mean obj so when we call this.bar(a) -> it's obj.bar(a) , so now in bar function , this-> mean obj not window.
//////////////////////////////////////////////////////////////////

function foo() {
  function bar(a) {
    this.a = a;
  }

  var obj = new bar(2);
  obj.bar = bar;
  var obj2 = obj;
  obj2.bar(5);
  console.log(obj2.a); //? what is the result and why
}
//foo();
//answer : the output is 5 // because( obj2.bar(5);) obj2 is an object have prop bar refer to bar function
//so when we call bar like ( obj2.bar(5);) we call it implicit within obj2 , so this.a inside bar -> this refer to obj2
//and it = 5

///////////////////////////////////////////////////////////////////

function foo() {
  setTimeout(
    () => console.log(this.a) //answer

    //function () {
    //console.log(this.a);} // what is the result ? and why
    //if is undefined how can make sure to print 3
  );
}

var obj = {
  a: 3,
};

//foo.call(obj);
//answer : the output is undefined , because the callbake function (the parameter in settimeout ) it will
//execute its after a specified delay , and we know that (this -> depend on where the function call )
//but it is called by the JavaScript runtime environment, and the context in which it is executed is not explicitly set , so
//it take default (global) , and we dont have global var 'a' so the answer undefined , to solve it , i replace the callbake function to be
//arrow function , because in arrow function the value of 'this' will be inherited from the enclosing scope, which is the obj
