import XLSX from "xlsx";
import * as fs from 'fs';
export function Escrever(xlsxParam) {
    // Requiring module
    // const reader = require('xlsx');

    fetch('./empty.xlsx')
        .then(response => response.arrayBuffer())
        .then(buffer => {
            const xlsx = XLSX.read(new Uint8Array('', { type: 'array' }));
            const ws = XLSX.utils.aoa_to_sheet(xlsxParam);
            const wb = XLSX.utils.book_new()
            XLSX.utils.book_append_sheet(wb, ws, 'Responses')
            XLSX.writeFile(wb, 'sampleData.xlsx');

        }).catch(err => console.error(err));


    // // Reading our test file
    // const file = reader.readFile('./empty.xlsx')

    // // Sample data set
    // let student_data = xlsxParam

    // const ws = reader.utils.json_to_sheet(student_data)

    // reader.utils.book_append_sheet(file, ws, "Sheet2")

    // // Writing to our file
    // reader.writeFile(file, './test.xlsx')
}

