const dbName = 'DemoDB'
const dbStoreName = 'DemoStore'
const dbVersion = 1

abstract class UserSettings {
  static data: any = undefined
  static error: any = undefined

  static openDatabase = () => {
    return new Promise<IDBDatabase>((resolve, reject) => {
      const request = indexedDB.open(dbName, dbVersion)

      request.onerror = (event: any) => {
        reject('Database error: ' + event.target.errorCode)
      }

      request.onsuccess = (event: any) => {
        resolve(event.target.result)
      }

      request.onupgradeneeded = (event: any) => {
        const db = event.target.result
        db.createObjectStore(dbStoreName, { keyPath: 'id' })
      }
    })
  }

  abstract addData(data: any): Promise<void>;

  abstract getData(): Promise<void>;
}

export class CustomColumns extends UserSettings {
  addData(data: any): Promise<void> {
    throw new Error("Method not implemented.")
  }
  getData(): Promise<void> {
    throw new Error("Method not implemented.")
  }

  // static async addData(data: any) {
  //   try {
  //     const db = await this.openDatabase();
  //     const transaction = db.transaction(dbStoreName, 'readwrite');
  //     const store = transaction.objectStore(dbStoreName);
  //     const item = { id: Date.now(), value: data };
  //     store.add(item);

  //     transaction.oncomplete = () => {
  //       console.log('Custom data added successfully');
  //     };

  //     transaction.onerror = (event: any) => {
  //       this.error = 'Transaction error: ' + event.target.errorCode;
  //     };
  //   } catch (err) {
  //     this.error = err;
  //   }
  // }

  // static async getData() {
  //   try {
  //     const db = await this.openDatabase();
  //     const transaction = db.transaction(dbStoreName, 'readonly');
  //     const store = transaction.objectStore(dbStoreName);
  //     const request = store.getAll();

  //     request.onsuccess = (event: any) => {
  //       this.data = event.target.result.map((item: any) => ({
  //         ...item,
  //         value: item.value + ' (customized)',
  //       }));
  //     };

  //     request.onerror = (event: any) => {
  //       this.error = 'Get data error: ' + event.target.errorCode;
  //     };
  //   } catch (err) {
  //     this.error = err;
  //   }
  // }
}