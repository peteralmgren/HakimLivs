
const getBtn = document.getElementById('getbtn');
const postBtn = document.getElementById('sendbtn');

var order = '{"order":[' +
'{ "productid":"1" , "quantity":"3" , "customerid":"12"},' +
'{ "productid":"4" , "quantity":"2" , "customerid":"12"},' +
'{ "productid":"3" , "quantity":"1" , "customerid":"12"} ]}';

let test = {productid: "1", quantity: "4", customerid: "12"}

var jsonData = JSON.parse(order)

/* let order = [{'customerid':12}
            ,{'quantity':4,'productid':1}
            ,{'quantity':2,'productid':3}]
 */

const getData = () => {
    axios.get('https://grupp5hakimlivs.herokuapp.com/all').then(response =>{
      console.log(response);
    });
  };

  const sendData = () => {
      axios.post('https://grupp5hakimlivs.herokuapp.com/order',{
          jsonData

      },{
          headers:{
              'Content-Type': 'application/json'
          }  
      
  })
  .then(response =>{
      console.log(response);
  })
  .catch(err =>{
      console.log(err, response);
  })
}

  getBtn.addEventListener('click', getData);
  postBtn.addEventListener('click', sendData);
  