// Declare and define fumction that searches for a user in the dataBase

import encodeStr from './encodeStr'; // Imports `encodeStr` function


function searchUser(email, password, dataBase) {
  let exist = false;

  const userID = `${encodeStr(email.toUpperCase())}${encodeStr(password)}`;

  dataBase.map((entry) => {
    if (entry.id === userID) {
      exist = true;
    }
  });

  if (exist === true) {
    return true;
  }
  else if (exist === false) {
    return false;
  }

}


export default searchUser;
