let a = {
  b: {
    c: 'd',
  },
};

a['b.c'] = 'e';

console.log(a);
