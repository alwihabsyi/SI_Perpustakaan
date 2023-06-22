import React, { useState } from "react";
import Layout from "@/widget/Layout";
import Judul from "@/components/Judul";
import { db } from "@/config/firebase";
import { collection, addDoc, CollectionReference } from "firebase/firestore";
import { useRouter } from "next/router";

const TambahBuku = () => {
  const [namaBuku, setNamaBuku] = useState("");
  const [pengarang, setPengarang] = useState("");
  const [deskripsiBuku, setDeskripsiBuku] = useState("");
  const [tahunTerbit, setTahunTerbit] = useState("");
  const bukuCollectionRef = collection(db, "buku")
  const router = useRouter();
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await addDoc (bukuCollectionRef, {
        nama_buku: namaBuku,
        pengarang: pengarang,
        deskripsi_buku: deskripsiBuku,
        tahun_terbit: tahunTerbit
      });
      router.push("/");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Layout>
      <div className="flex justify-center mx-2 mt-10">
        <div className="w-[550px] rounded-lg shadow-gray-200 shadow-lg p-10">
          {/* Judul */}
          <Judul title="Form Tambah Buku"/>
          {/* form tambah */}
          <form onSubmit={submitHandler} className="mt-6">
            <div className="mb-3">
              <label className="text-md">Nama Buku</label>
              <input
                type="text"
                className="mt-2 block w-11/12 rounded-xl border px-3 py-2"
                onChange={(e) => {setNamaBuku(e.target.value);}}
                value={namaBuku}
              />
            </div>
            <div className="mb-3">
              <label className="text-md">Pengarang</label>
              <input
                type="text"
                className="mt-2 block w-11/12 rounded-xl border px-3 py-2"
                onChange={(e) => {setPengarang(e.target.value);}}
                value={pengarang}
              />
            </div>
            <div className="mb-3">
              <label className="text-md">Deskripsi Buku</label>
              <input
                type="text"
                className="mt-2 block w-11/12 rounded-xl border px-3 py-2"
                onChange={(e) => {setDeskripsiBuku(e.target.value);}}
                value={deskripsiBuku}
              />
            </div>
            <div className="mb-3">
              <label className="text-md">Tahun Terbit</label>
              <input
                type="text"
                className="mt-2 block w-11/12 rounded-xl border px-3 py-2"
                onChange={(e) => {setTahunTerbit(e.target.value);}}
                value={tahunTerbit}
              />
            </div>
            <div className="flex items-stretch w-11/12">
                <div className="w-full"></div>
                <button className="bg-sky-500 hover:bg-sky-800 px-3 py-2 rounded-lg text-white shadow-lg mt-3">
                Simpan
                </button>
                <div className="w-full"></div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default TambahBuku;
