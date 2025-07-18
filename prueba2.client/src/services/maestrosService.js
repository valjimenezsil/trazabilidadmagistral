//FETCHMEZCLAS
export const fetchMezclaData = async () => {
    try {
        const response = await fetch('https://localhost:7246/Maestros/GetMezclas');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching mezcla data:', error);
        throw error;
    }
}

// FETCHPRODUCTOS
export const fetchProductosData = async () => {
    try {
        const response = await fetch('https://localhost:7246/Maestros/GetProductos');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching products data:', error);
        throw error;
    }
};