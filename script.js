// Fungsi untuk menampilkan jam realtime
function updateClock() {
    var now = new Date(), hours = now.getHours(), minutes = now.getMinutes(), seconds = now.getSeconds();
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    document.getElementById('realtime-clock').textContent = hours + ' : ' + minutes + ' : ' + seconds;
    setTimeout(updateClock, 1000);
}
updateClock(); // Memulai fungsi jam

var currentRow;
var currentEditRow; // Variabel untuk menyimpan baris yang sedang diedit

// Fungsi untuk menambahkan data ke tabel
function addDataToTable(nim, nama, alamat) {
    var table = document.getElementById('data-table');
    var row = table.insertRow(-1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    cell1.textContent = nim;
    cell2.textContent = nama;
    cell2.className = 'nama'; // Tambahkan kelas 'nama'
    cell3.textContent = alamat;
    cell3.className = 'alamat'; // Tambahkan kelas 'alamat'
    cell4.innerHTML = '<button class="btn btn-primary edit" data-toggle="modal" data-target="#editModal">Edit</button> <button class="btn btn-danger delete" onclick="deleteData(this)">Hapus</button>';
}

// Fungsi untuk menghapus data
function deleteData(button) {
    var row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
    $('#toastDel').toast({animation: true});
    $('#toastDel').toast('show');
}

// Fungsi untuk menangani form submit
document.getElementById('data-form').addEventListener('submit', function(event) {
    event.preventDefault();
    var nim = document.getElementById('nim').value;
    var nama = document.getElementById('nama').value;
    var alamat = document.getElementById('alamat').value;
    if(nim == "" || nama == "" || alamat == ""){
        $('#toastWar').toast({animation: true});
        $('#toastWar').toast('show');
    }else{
        addDataToTable(nim, nama, alamat);
        $('#toastTmb').toast({animation: true});
        $('#toastTmb').toast('show');
    }
});

// Fungsi untuk menangani klik tombol edit
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('edit')) {
        currentEditRow = event.target.closest('tr');
        var name = currentEditRow.querySelector('.nama').textContent;
        var address = currentEditRow.querySelector('.alamat').textContent;

        document.getElementById("editName").value = name;
        document.getElementById("editAddress").value = address;
    }
});

// Fungsi untuk menyimpan perubahan pada data yang diedit
document.getElementById('saveChanges').addEventListener('click', function() {
    var name = document.getElementById("editName").value;
    var address = document.getElementById("editAddress").value;

    currentEditRow.querySelector('.nama').textContent = name;
    currentEditRow.querySelector('.alamat').textContent = address;
    $('#toastEdit').toast({animation: true});
    $('#toastEdit').toast('show');
    $('#editModal').modal('hide');
});

document.addEventListener("DOMContentLoaded", function() {
    var container = document.querySelector('.container');
    container.style.height = window.innerHeight + 'px';
});