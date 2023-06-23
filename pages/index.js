import Layout from "@/widget/Layout";
import IconDelete from "@/assets/IconDelete";
import IconUbah from "@/assets/IconUbah";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { db } from "@/config/firebase";
import { 
  collection, doc, getDocs, deleteDoc,
  query, orderBy
} from "firebase/firestore";

export default function Home() {
  const [buku, setBuku] = useState([]);
  const [search, setSearch] = useState([]);
  const router = useRouter();

  const addBookHandler = () => {
    router.push("/tambah-buku");
  };

  const updateBookHandler = (id) => {
    router.push(`/ubah-buku/${id}`);
  };

  const bukuCollectionRef = collection(db, "buku");
  const sortData = query(bukuCollectionRef, orderBy("tahun_terbit", "desc"));
  const getBukuList = async() => {
    try {
      const data = await getDocs(sortData);
      const filteredData = data.docs.map((doc) => ({
        ... doc.data(),
        id: doc.id,
      }));
      setBuku(filteredData);
      console.log(data);
      console.log(filteredData);
    } catch (e) {
      console.log(e);
    }
  };
  const deleteBuku = async(id) => {
    const bukuDoc = doc(db, "buku", id);
    await deleteDoc(bukuDoc);
    getBukuList();
  }

  useEffect(() => {
    getBukuList();
  }, []);

  return (
    <Layout>
      <div className="flex justify-center mx-3">
        <div>
          {/* judul */}
          <div className="mt-10 mb-4">
            <h3 className="text-xl font-semibold">Data Buku Perpustakaan</h3>
          </div>

          <div className="flex items-center justify-between">
            <button onClick={addBookHandler} className="bg-sky-500 px-3 py-1 text-white rounded-md hover:bg-sky-700">
              Tambah Buku
            </button>

            <div className="flex items-center justify-end">
              <input 
                type="text"
                className="w-42 mt-2 block rounded-xl border px-3 py-2"
                onChange={(e) => setSearch(e.target.value)}
                placeholder="ketik nama buku"
              />
            </div>
          </div>
          {/* tabel */}
          <div className="mt-5">
            <table className="bg-sky-50 py-10 rounded-xl table-auto">
              <thead className="border-b-4">
                <tr>
                  <th className="px-6 py-2">Nama Buku</th>
                  <th className="px-6 py-2">Pengarang</th>
                  <th className="px-6 py-2">Deskripsi Buku</th>
                  <th className="px-6 py-2">Tahun Terbit</th>
                  <th className="px-6 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {buku.length >= 1 ? (buku
                .filter((data) => data.nama_buku ?.toLowerCase().includes(search))
                .map((data) => (
                  <tr className="hover:bg-sky-200" key={data.id}>
                    <td className="px-6 py-2">{data.nama_buku}</td>
                    <td className="px-6 py-2">{data.pengarang}</td>
                    <td className="px-6 py-2">{data.deskripsi_buku}</td>
                    <td className="px-6 py-2">{data.tahun_terbit}</td>
                    <td className="flex px-6 py-2">
                      <span onClick={() => {updateBookHandler(data.id);}} className="cursor-pointer h-7 w-7 mr-2 hover:text-blue-500"><IconUbah /></span>
                      <span onClick={() => {deleteBuku(data.id);}} className="cursor-pointer h-7 w-7 hover:text-red-500"><IconDelete /></span>
                    </td>
                  </tr>
                ))
                ) : (
                  <tr>
                    <td className="py-5 text-center" colSpan={6}>
                      Belum ada data buku!
                    </td>
                  </tr>
                )
              }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}
