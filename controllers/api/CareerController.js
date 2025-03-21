// import expess
const express = require('express');

// create router
const router = express.Router();

// import connection
const connection = require('../../config/database');

// import axios
const axios = require('axios');

const cleanData = (data) => {
    // Pisahkan baris
    const rows = data.trim().split('\n');

    // Ambil header
    const headers = rows[0].split('|').map(h => h.trim());

    // Ubah setiap baris tanpa mengubah posisi elemen
    const hasil = rows.slice(1).map(row => {
        const values = row.split('|').map(v => v.trim()); // Gunakan split langsung tanpa regex

        return Object.fromEntries(headers.map((header, index) => [header, values[index] || ''])); // Pastikan tetap sejajar dengan header
    });

    return hasil;
};


const fetchAllCareer = async () => {
    try {
        const response = await axios.get("https://bit.ly/48ejMhW");
        return cleanData(response.data.DATA);
    } catch (error) {
        throw new Error("Gagal mengambil data: " + error.message);
    }
};

const getAllCareer = async (req, res) => {
    try {
        const data = await fetchAllCareer();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getByNama = async (req, res) => {
    try {
        const data = await fetchAllCareer();
        const result = data.filter(item => item.NAMA === req.params.nama);

        if (result.length === 0) return res.status(404).json({ message: data });
        res.json(result);
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }


}

const getByNim = async (req, res) => {
    try {
        const data = await fetchAllCareer();
        const result = data.filter(item => item.NIM === req.params.nim);
        if (result.length === 0) return res.status(404).json({ message: data });
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// get by YMD
const getByYMD = async (req, res) => {
    try {
        const data = await fetchAllCareer();
        const result = data.filter(item => item.YMD === req.params.ymd);
        if (result.length === 0) return res.status(404).json({ message: data });
        res.json(result);


    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


module.exports = {
    getAllCareer,
    getByNama,
    getByNim,
    getByYMD
}