// Array produk
document.addEventListener('alpine:init', () => {
        Alpine.data('products', () => ({
            items: [
                { id: 1, name: 'Gayo', img: 'product1.png', price: 120000},
                { id: 2, name: 'Mandheling', img: 'product1.png', price: 130000},
                { id: 3, name: 'Kintamani', img: 'product1.png', price: 130000},
                { id: 4, name: 'Java Preanger', img: 'product1.png', price: 120000},
                { id: 5, name: 'Flores Bajawa', img: 'product1.png', price: 140000},
            ],
            
        }));
        
        Alpine.store('cart', {
            items: [],
            total: 0,
            quantity: 0,
            add(newItem){
                // apakah ada barang yang sama di cart
                const cartItem= this.items.find((item) => item.id === newItem.id);
                // jika belum ada atau cart masih kosong
                if(!cartItem){
                    this.items.push({ ...newItem, quantity: 1, total: newItem.price});
                    this.quantity++;
                    this.total += newItem.price;
                }
                // jika barang sudah ada di cart, cek apakah barang beda atau sama dengan yang ada di cart
                else {
                    this.items = this.items.map((item) => {
                        // jika barang berbeda
                        if (item.id !== newItem.id){
                            return item;
                        }
                        else {
                            item.quantity++;
                            item.total = item.price * item.quantity;
                                this.quantity++;
                                this.total += item.price;
                                return item;
                        }
                    });
                }
            },
            remove(id){
                // ambil item yang mau di remove berdasarkan id
                const cartItem = this.items.find((item) => item.id === id);

                // jika item lebih dari 1 
                if (cartItem.quantity > 1){
                    // telusuri satu satu
                    this.items = this.items.map((item) => {
                        // jika bukan barang yang diklik
                        if(item.id !== id) {
                            return item;
                        }
                        else {
                            item.quantity--;
                            item.total = item.price * item.quantity;
                                this.quantity--;
                                this.total -= item.price;
                                return item;

                        }
                    });
                }
                else if (cartItem.quantity === 1) {
                    // jika barang sisa 1
                    this.items =  this.items.filter((item) => item.id !== id);
                    this.quantity--;
                    this.total -= cartItem.price;
                }
            },
        });
    });

    // Form Validation
    const checkoutButton = document.querySelector('.checkout-btn');
    checkoutButton.disabled = true;
    
    const form = document.querySelector('#checkout-form');

    form.addEventListener('keyup', function(){
        for(let i = 0; i < form.elements.length; i++){
            if(form.elements[i].value.length !== 0){
                checkoutButton.classList.remove('disabled');
                checkoutButton.classList.add('disabled');
            }
            else {
                return false;
            }
        }
        checkoutButton.disabled = false;
        checkoutButton.classList.remove('disabled');
    });

    // Kirim data ketika tombol checkout diklik
    checkoutButton.addEventListener('click', function(e){
        e.preventDefault();
        const formData = new FormData(form);
        const data = new URLSearchParams(formData);
        const objData = Object.fromEntries(data);
        const message = formatMessage(objData);
        console.log(objData);
        window.open('http://wa.me/62895364615701?text=' + encodeURIComponent(message));  
    });

    // Format pesan whatsapp
    const formatMessage = (obj) =>{
        return `*Data Costumer*\n
Nama: ${obj.name}
Email: ${obj.email}
No. Telp: ${obj.phone}\n
*Data Pesanan*\n
${JSON.parse(obj.items).map((item) => `${item.name} (${item.quantity} x ${rupiah(item.price)}) \n`)}\n       
*Total : ${rupiah(obj.total)}*\n
Terima Kasih.`
    }

    // Konversi ke Rupiah
    const rupiah = (number) => {
        return new Intl.NumberFormat('id-ID',{
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(number);
    };