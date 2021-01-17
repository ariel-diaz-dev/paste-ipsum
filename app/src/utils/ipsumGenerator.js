function generateIpsum(ipsumSourceArr, count) {
  ret = '';
  for (i = 0; i < count; i++) {
    let newIpsum = ipsumSourceArr[Math.floor(Math.random() * (ipsumSourceArr.length - 1))];
    ret += newIpsum + ' ';
  } 
  return ret;
} 