import { Vinculo } from './../../domain/entities/Vinculo';
import {
  addDoc,
  Firestore,
  collection,
  getDocs,
  where,
  query,
  DocumentData,
  Query,
  collectionGroup,
  doc,
  deleteDoc,
  setDoc,
} from 'firebase/firestore';
import { db } from './../../firebase/firebase';

export class VinculoRepositoryDatabase {
  db: Firestore;

  constructor() {
    this.db = db;
  }

  async addVinculo(vinculo: Vinculo, companyId: string): Promise<void> {
    const numeroFT = vinculo.values['Ficha Técnica'];
    const LTU = vinculo.values['Plano de Viagem'];
    const colRef = collection(this.db, `companies/${companyId}/fts`);
    const q = query(colRef, where('Nº da FT', '==', numeroFT));
    const qSnapshot = await getDocs(q);

    const ftData = qSnapshot.docs[0].data();
    if (ftData['Nº da Linha'] !== LTU)
      throw new Error('LTU fornecida não pertence a esta Ficha Técnica');

    const vinculosColRef = collection(
      this.db,
      `companies/${companyId}/vinculos`
    );
    const vinculosQuery = query(
      vinculosColRef,
      where('Ficha Técnica', '==', numeroFT)
    );
    const vinculosSnapshot = await getDocs(vinculosQuery);
    if (vinculosSnapshot.docs.length > 0)
      throw new Error(
        'Impossivel adicionar vínculo! Nº da Ficha Técnica já possui vínculo relacionado!'
      );

    // // const q = query(colRef, where('Placa', '==', Vinculo.values.Placa));
    // const q = query(colRef);
    // const querySnapshot = await getDocs(q);

    // if (querySnapshot.docs.length > 0)
    //   throw new Error('Itinerário já cadastrado!');

    addDoc(vinculosColRef, vinculo.values);
  }

  async updateVinculo(vinculo: Vinculo, companyId: string, vinculoId: string) {
    const docRef = doc(this.db, `companies/${companyId}/vinculos/${vinculoId}`);
    setDoc(docRef, vinculo.values);
  }

  async getVinculos(): Promise<Vinculo[]> {
    const colRef = collection(this.db, 'vinculos');
    return this.getVinculosFromQuery(colRef);
  }

  async getVinculosFromQuery(query: Query<DocumentData>) {
    const querySnapshot = await getDocs(query);
    let vinculos: Vinculo[] = [];
    querySnapshot.forEach((doc) => {
      console.log('1');
      const data: any = doc.data();
      console.log('2');
      data.Id = doc.id;
      vinculos.push(new Vinculo(data));
    });
    return vinculos;
  }

  async getVinculosFromCompanyId(companyId: string) {
    const colRef = collection(this.db, `companies/${companyId}/vinculos`);
    return this.getVinculosFromQuery(colRef);
  }

  async adminGetAllVinculos() {
    const group = collectionGroup(this.db, 'vinculos');
    return this.getVinculosFromQuery(group);
  }

  async deleteVinculo(companyId: string, vinculoId: string) {
    const docRef = doc(this.db, `companies/${companyId}/vinculos/${vinculoId}`);
    await deleteDoc(docRef);
  }
}
