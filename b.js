class a {
  static b = 10;
}

const c = new a();

// a.b = 20;

console.log(c.b);

// const fetchDrivers = async () => {
//   const repo = new DriverRepositoryDatabase();
//   const drivers = await repo.getDriversFromCompanyId(companyId);
//   setDrivers(drivers);
// };
// fetchDrivers();
// const fetchUserData = async () => {
//   const docRef = doc(db, 'users', userId);
//   const docSnap = await getDoc(docRef);

//   if (!docSnap.exists()) throw new Error('Usuário não existe!');
//   return docSnap.data();
// };

// const fetchOneCompany = async (companyId: string) => {
//   const docRef = doc(db, 'companies', companyId);
//   const docSnap = await getDoc(docRef);

//   if (!docSnap.exists()) throw new Error('Transportadora não encontrada!');
//   console.log(docSnap.data());
//   return docSnap.data();
// };

// fetchUserData().then((userData: any) => {
//   fetchOneCompany(userData.companyId);
// });

// const fetchDrivers = async () => {
//   const repo = new DriverRepositoryDatabase();
//   const drivers = await repo.getDrivers();
//   setDrivers(drivers);
// };
// fetchDrivers();
