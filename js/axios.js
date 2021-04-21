
// const getBtn = document.getElementById('getbtn');
// const postBtn = document.getElementById('sendbtn');

// var order = '{"order":[' +
// '{ "productid":"1" , "quantity":"3" , "customerid":"12"},' +
// '{ "productid":"4" , "quantity":"2" , "customerid":"12"},' +
// '{ "productid":"3" , "quantity":"1" , "customerid":"12"} ]}';

// let test = {"productid": "1", "quantity": "4", "customerid": "12"}

// var jsonData = JSON.parse(order)

// /* let order = [{'customerid':12}
//             ,{'quantity':4,'productid':1}
//             ,{'quantity':2,'productid':3}]
//  */
// //  Request URL: https://grupp5hakimlivs.herokuapp.com/order?callback=jQuery1124029594176461859134_1618995102669
// //               &customerid=12&productid=1&quantity=4&_=1618995102670

// //Request URL: https://grupp5hakimlivs.herokuapp.com/addproduct?callback=jQuery112408243044142508422_1618995442759
// //&category_id=1&title=Vindruvor&description=fdfdfd&price=44&image=dfdfdf&_=1618995442760

// let headers = new Headers();

//   headers.append('Content-Type', 'application/json');
//   headers.append('Accept', 'application/json');

//   headers.append('Access-Control-Allow-*','https://grupp5hakimlivs.herokuapp.com/order');
//   headers.append('Access-Control-Allow-Credentials', 'true');


// const getData = () => {
//     axios.get('https://grupp5hakimlivs.herokuapp.com/all').then(response =>{
//       console.log(response);
//     });
//   };

//   const sendData = () => {
//       axios.post('https://grupp5hakimlivs.herokuapp.com/order',{
//         customer_id: 12,
//         product_id: 1, 
//         quantity: 4
//         /* test */
        
    

//       },{ headers 
//            /* headers:{
//               'Content-Type': 'application/json'
//           } */ 
      
//   })
//   .then(response =>{
//       console.log(response);
//   })
//   .catch(err =>{
//       console.log(err, response);
//   })
// }

//   getBtn.addEventListener('click', getData);
//   postBtn.addEventListener('click', sendData);
  