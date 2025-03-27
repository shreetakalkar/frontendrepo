import React, { useState, useEffect } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Paper,
    MenuItem,
    Pagination,
    TextField,
    Button,
    Grid,
    Box, 
    IconButton,
    Select
} from "@mui/material";
import { RefreshCw } from "lucide-react";
import SetMinPriceModal from "../../SetMinPriceModel";

const InventoryTable = () => {
    const [entriesPerPage, setEntriesPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    //const [minPrices, setMinPrices] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [bargainingDetails, setBargainingDetails] = useState([]);
    const [refreshKey, setRefreshKey] = useState(0);
    const [lockedMinPrices, setLockedMinPrices] = useState({});

    // Load saved state from localStorage
    useEffect(() => {
        const savedBargainingDetails = localStorage.getItem('bargainingDetails');
        const savedLockedMinPrices = localStorage.getItem('lockedMinPrices');
        if (savedBargainingDetails) {
            setBargainingDetails(JSON.parse(savedBargainingDetails));
        }
        if (savedLockedMinPrices) {
            setLockedMinPrices(JSON.parse(savedLockedMinPrices));
        }
    }, []);

    const handleRefresh = () => {
        setRefreshKey(prevKey => prevKey + 1);
        setLoading(true);
    };

    


    // // Function to handle Save action
    // const handleSaveMinPrice = (id) => {
    //     if (minPrices[id]) {
    //         alert(`Min price for ${id} has been saved: ${minPrices[id]}`);
    //     } else {
    //         alert(`Please set a min price for ${id} before saving.`);
    //     }
    // };

    // const handleSaveMinPrice = async (minPrice) => {
    //     try {
    //         const token = localStorage.getItem("authToken");
    //         const response = await fetch('http://localhost:8000/api/v1/bargaining/set-min-price', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': `Bearer ${token}`
    //             },
    //             body: JSON.stringify({
    //                 productId: selectedProduct.id,
    //                 minPrice: minPrice
    //             })
    //         });

    //         if (!response.ok) {
    //             throw new Error('Failed to set min price');
    //         }

    //         const result = await response.json();

    //         const updatedBargainingDetails = {
    //             ...bargainingDetails,
    //             [selectedProduct.id]: {
    //                 ...bargainingDetails[selectedProduct.id],
    //                 minPrice: result.data.minPrice,
    //                 isActive: true
    //             }
    //         };

    //         const updatedLockedMinPrices = { ...lockedMinPrices, [selectedProduct.id]: true };

    //         setBargainingDetails(updatedBargainingDetails);
    //         setLockedMinPrices(updatedLockedMinPrices);

    //         localStorage.setItem('bargainingDetails', JSON.stringify(updatedBargainingDetails));
    //         localStorage.setItem('lockedMinPrices', JSON.stringify(updatedLockedMinPrices));

    //         await fetchProducts();
    //         alert("Minimum price set successfully. Product is now active.");

    //     } catch (error) {
    //         // console.error("Error setting min price:", error);
    //         alert("Failed to set minimum price");
    //     }
    // };

    const handleSaveMinPrice = async (minPrice) => {
        try {
            const token = localStorage.getItem("authToken");
            const numericPrice = parseFloat(minPrice);
    
            if (isNaN(numericPrice) || numericPrice >= selectedProduct?.defaultPrice) {
                alert("Minimum price must be less than the default price!");
                return;
            }
    
            const response = await fetch('http://localhost:8000/api/v1/bargaining/set-min-price', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    productId: selectedProduct?.id,
                    discount: numericPrice 
                })
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                console.error("Server Response:", errorData);
                throw new Error(errorData.message || 'Failed to set min price');
            }
    
            const result = await response.json();
            console.log("Response from API:", result);
    
            const updatedBargainingDetails = {
                ...bargainingDetails,
                [selectedProduct?.id]: {
                    ...bargainingDetails[selectedProduct?.id],
                    minPrice: result.data.discount,
                    isActive: true
                }
            };
    
            const updatedLockedMinPrices = { ...lockedMinPrices, [selectedProduct?.id]: true };
    
            setBargainingDetails(updatedBargainingDetails);
            setLockedMinPrices(updatedLockedMinPrices);
    
            localStorage.setItem('bargainingDetails', JSON.stringify(updatedBargainingDetails));
            localStorage.setItem('lockedMinPrices', JSON.stringify(updatedLockedMinPrices));
    
            await fetchProducts();
            alert("Minimum price set successfully. Product is now active.");
    
        } catch (error) {
            console.error("Error setting min price:", error);
            alert(error.message || "Failed to set minimum price");
        }
    };
    

    const fetchBargainingDetails = async () => {
        try {
            const token = localStorage.getItem("authToken");
            const response = await fetch(`http://localhost:8000/api/v1/bargaining/details?timestamp=${Date.now()}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Cache-Control": "no-cache, no-store, must-revalidate",
                    "Pragma": "no-cache",
                    "Expires": "0"
                }
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                console.error(`HTTP Error: ${response.status} - ${errorMessage}`);
                throw new Error(`Error ${response.status}: ${errorMessage}`);
            }

            return await response.json();
        } catch (error) {
            console.error("Error fetching bargaining details:", error);
            throw error;
        }
    };

    useEffect(() => {
        fetchBargainingDetails();
    }, []);


    // const fetchBargainingDetails = async () => {
    //     try {
    //         const token = localStorage.getItem("authToken");
    //         if (!token) {
    //             alert("Authentication token is missing!");
    //             return;
    //         }
    
    //         const response = await fetch("http://localhost:8000/api/v1/bargaining/get-all-products", {
    //             method: "GET",
    //             headers: {
    //                 "Authorization": `Bearer ${token}`,
    //                 "Content-Type": "application/json",
    //             },
    //         });
    
    //         const result = await response.json();
    //         if (!response.ok) {
    //             throw new Error(result.message || "Failed to fetch bargaining details");
    //         }
    
    //         console.log("Fetched Bargaining Details:", result);
    //         setBargainingDetails(result.data || {}); // Assuming `data` holds bargaining info
    //         localStorage.setItem("bargainingDetails", JSON.stringify(result.data || {}));
    
    //     } catch (error) {
    //         console.error("Error fetching bargaining details:", error);
    //     }
    // };    


    const fetchProducts = async () => {
        try {
            const token = localStorage.getItem("authToken");
            if (!token) {
                throw new Error("No authentication token found");
            }

            const response = await fetch(`http://localhost:8000/api/v1/shopify/all-products?timestamp=${Date.now()}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                    "Cache-Control": "no-cache, no-store, must-revalidate",
                    "Pragma": "no-cache",
                    "Expires": "0"
                }
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                console.error(`HTTP Error: ${response.status} - ${errorMessage}`);
                throw new Error(`Error ${response.status}: ${errorMessage}`);
            }

            return await response.json();
        } catch (err) {
            console.error("Error fetching products:", err);
            throw err;
        }
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [productsResponse, bargainingDetailsResponse] = await Promise.all([
                    fetchProducts(),
                    fetchBargainingDetails()
                ]);
                console.log("productsResponse:", productsResponse);
                console.log("bargainingDetailsResponse:", bargainingDetailsResponse);

                const bargainingDetailsMap = bargainingDetailsResponse.data.reduce((map, detail) => {
                    map[detail.productId] = {
                        minPrice: detail.minPrice,
                        behavior: detail.behavior,
                        isActive: false  
                    };
                    return map;
                }, {});

                // Retrieve saved bargaining details from localStorage
                const savedBargainingDetails = JSON.parse(localStorage.getItem('bargainingDetails') || '{}');
                const savedLockedMinPrices = JSON.parse(localStorage.getItem('lockedMinPrices') || '{}');

                const transformedData = productsResponse.data.products.map(product => {
                    // Prioritize the most recent min price from the server or localStorage
                    const serverMinPrice = bargainingDetailsMap[product.id]?.minPrice;
                    const localMinPrice = savedBargainingDetails[product.id]?.minPrice;
                    const minPrice = serverMinPrice || localMinPrice || "";

                    return {
                        id: product.id,
                        price: `$${product.price}`,
                        status: bargainingDetailsMap[product.id]?.isActive ? "Active" : "Inactive",
                        category: product.product_type,
                        product: product.name,
                        behavior: "Normal",
                        quantity: product.inventory_quantity,
                        minPrice: minPrice,
                        defaultPrice: parseFloat(product.price)
                    };
                });

                console.log("Transformed Data:", transformedData.length, transformedData);

                // Update bargaining details with the latest information
                const updatedBargainingDetails = { ...bargainingDetailsMap };
                Object.keys(savedBargainingDetails).forEach(key => {
                    if (updatedBargainingDetails[key]) {
                        updatedBargainingDetails[key].isActive = savedBargainingDetails[key].isActive;
                    }
                });

                setProducts(transformedData);
                setBargainingDetails(updatedBargainingDetails);
                setLockedMinPrices(savedLockedMinPrices);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching data:", err);
                setError(err.message || "Failed to fetch data");
                setLoading(false);
            }
        };

        fetchData();
    }, [refreshKey]);


    const handleToggleActive = async (id) => {
        const currentActiveCount = Object.values(bargainingDetails).filter(detail => detail.isActive).length;
        const isCurrentlyActive = bargainingDetails[id]?.isActive;
        if (!isCurrentlyActive && currentActiveCount >= 10) {
            alert("Maximum 10 products can be active at a time!");
            return;
        }
        const updatedBargainingDetails = { ...bargainingDetails };
        updatedBargainingDetails[id] = {
            ...updatedBargainingDetails[id],
            isActive: !isCurrentlyActive
        };

        if (isCurrentlyActive) {
            setBargainingDetails(updatedBargainingDetails);
            localStorage.setItem('bargainingDetails', JSON.stringify(updatedBargainingDetails));
            return;
        }
        const newActiveCount = Object.values(updatedBargainingDetails).filter(detail => detail.isActive).length;
        if (newActiveCount > 10) {
            alert("Maximum 10 products can be active at a time!");
            return;
        }

        setBargainingDetails(updatedBargainingDetails);
        localStorage.setItem('bargainingDetails', JSON.stringify(updatedBargainingDetails));
    };

    // const handleSetMinPrice = async (id, defaultPrice, quantity) => {
    //     if (quantity <= 0) {
    //         alert("Cannot set minimum price for products with no inventory!");
    //         return;
    //     }

    //     // Check if min price is already locked
    //     if (lockedMinPrices[id]) {
    //         alert("Minimum price is currently locked. Delete it first to set a new price.");
    //         return;
    //     }

    //     // Check the current number of active products
    //     const currentActiveCount = Object.values(bargainingDetails).filter(detail => detail.isActive).length;

    //     // If already at max active products and this product is not active
    //     if (currentActiveCount >= 10 && !bargainingDetails[id]?.isActive) {
    //         alert("Maximum 10 products can be active at a time!");
    //         return;
    //     }

    //     const newPrice = prompt("Set minimum price:");
    //     if (newPrice && !isNaN(newPrice)) {
    //         const numericPrice = parseFloat(newPrice);
    //         const numericDefaultPrice = parseFloat(defaultPrice);

    //         if (numericPrice >= numericDefaultPrice) {
    //             alert("Minimum price must be less than the default price!");
    //             return;
    //         }

    //         try {
    //             const token = localStorage.getItem("authToken");
    //             const response = await fetch('http://localhost:8000/api/v1/bargaining/set-min-price', {
    //                 method: 'POST',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                     'Authorization': `Bearer ${token}`
    //                 },
    //                 body: JSON.stringify({
    //                     productId: id,
    //                     minPrice: numericPrice
    //                 })
    //             });

    //             if (!response.ok) {
    //                 throw new Error('Failed to set min price');
    //             }

    //             const result = await response.json();

    //             const updatedBargainingDetails = {
    //                 ...bargainingDetails,
    //                 [id]: {
    //                     ...bargainingDetails[id],
    //                     minPrice: result.data.minPrice,
    //                     isActive: true  // Automatically set to active
    //                 }
    //             };

    //             const updatedLockedMinPrices = {
    //                 ...lockedMinPrices,
    //                 [id]: true
    //             };

    //             setBargainingDetails(updatedBargainingDetails);
    //             setLockedMinPrices(updatedLockedMinPrices);

    //             localStorage.setItem('bargainingDetails', JSON.stringify(updatedBargainingDetails));
    //             localStorage.setItem('lockedMinPrices', JSON.stringify(updatedLockedMinPrices));

    //             await fetchProducts();
    //             alert("Minimum price set successfully. Product is now active.");

    //         } catch (error) {
    //             console.error("Error setting min price:", error);
    //             alert("Failed to set minimum price");
    //         }
    //     }
    // };

    const handleSetMinPrice = (id, defaultPrice, quantity, product, category) => {
        if (quantity <= 0) {
            alert("Cannot set minimum price for products with no inventory!");
            return;
        }

        if (lockedMinPrices[id]) {
            alert("Minimum price is currently locked. Delete it first to set a new price.");
            return;
        }

        setSelectedProduct({ id, defaultPrice, product,category });
        setIsModalOpen(true);
    };

    const handleDeleteMinPrice = async (id) => {
        try {
            const token = localStorage.getItem("authToken");
            const response = await fetch(`http://localhost:8000/api/v1/bargaining/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to delete min price');
            }

            const updatedBargainingDetails = {
                ...bargainingDetails,
                [id]: {
                    ...bargainingDetails[id],
                    minPrice: "",
                    isActive: false
                }
            };

            const updatedLockedMinPrices = { ...lockedMinPrices };
            delete updatedLockedMinPrices[id];

            setBargainingDetails(updatedBargainingDetails);
            setLockedMinPrices(updatedLockedMinPrices);

            localStorage.setItem('bargainingDetails', JSON.stringify(updatedBargainingDetails));
            localStorage.setItem('lockedMinPrices', JSON.stringify(updatedLockedMinPrices));

            await fetchProducts();
            alert("Min price reset successfully");

        } catch (error) {
            console.error("Error resetting min price:", error);
            alert("Failed to reset minimum price");
        }
    };

    const filteredProducts = products.filter(product =>
        Object.values(product).some(value =>
            String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    const totalPages = Math.ceil(filteredProducts.length / entriesPerPage);
    const startIndex = (currentPage - 1) * entriesPerPage;
    const currentData = filteredProducts.slice(startIndex, startIndex + entriesPerPage);

    if (loading) return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
            <div className="custom-loader"></div>
        </Box>
    );

    if (error) return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
            <Typography color="error">Error: {error}</Typography>
        </Box>
    );


    return (
        <Paper className="p-4">
            <Grid container alignItems="center" sx={{ pt: 2, px: 3 }}>
                <Grid item xs>
                    <Typography variant="h6" sx={{ fontFamily: 'sans-serif', fontWeight: "bold", color: "#344767" }}>
                        Inventory Individual Product
                    </Typography>
                </Grid>
                <Grid item>
                    <IconButton onClick={handleRefresh} color="primary">
                        <RefreshCw className={loading ? "animate-spin" : ""} />
                    </IconButton>
                </Grid>
            </Grid>

            <div style={{ margin: "20px" }}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item>
                        <TextField
                            select
                            value={entriesPerPage}
                            onChange={(e) => setEntriesPerPage(Number(e.target.value))}
                            size="small"
                            variant="outlined"
                            sx={{ width: 60 }}
                        >
                            {[5, 10, 15].map((num) => (
                                <MenuItem key={num} value={num}>
                                    {num}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item>
                        <Typography variant="body2">Entries per page</Typography>
                    </Grid>
                    <Grid item xs />
                    <Grid item>
                        <TextField
                            label="Search here"
                            variant="outlined"
                            size="small"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)} sx={{ width: 300 }} />
                    </Grid>
                </Grid>
            </div>

            <TableContainer
                component={Paper}
                sx={{ boxShadow: 'none', borderRadius: '0', }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ px: 4 }}>ID</TableCell>
                            <TableCell sx={{ px: 4 }}>Default Price</TableCell>
                            <TableCell sx={{ px: 4 }}>Status</TableCell>
                            <TableCell sx={{ px: 4 }}>Category</TableCell>
                            <TableCell sx={{ px: 4 }}>Product</TableCell>
                            <TableCell sx={{ px: 4 }}>Behavior</TableCell>
                            <TableCell sx={{ px: 4 }}>Set Min Price</TableCell>
                            <TableCell sx={{ px: 4}}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentData.map((item) => (
                            <TableRow key={item.id}  sx={{
                                    "&:last-child td, &:last-child th": { border: 0 },
                                    px: 0, 
                                }}>
                                <TableCell>{item.id}</TableCell>
                                <TableCell>{item.price}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="outlined"
                                        color={bargainingDetails[item.id]?.isActive ? "success" : "error"}
                                        size="small"
                                        onClick={() => handleToggleActive(item.id)}
                                        disabled={item.quantity <= 0}
                                    >
                                        {bargainingDetails[item.id]?.isActive ? "Active" : "Inactive"}
                                    </Button>
                                </TableCell>
                                <TableCell>{item.category}</TableCell>
                                <TableCell>{item.product}</TableCell>
                                <TableCell >
                                    <Select
                                        value={item.behavior}
                                        size="small"
                                        variant="outlined"
                                        style={{ width: 120 }}
                                    >
                                        {[{ label: "Low", value: "Low" }, { label: "High", value: "High" }, { label: "Normal", value: "Normal" }].map((opt) => (
                                            <MenuItem key={opt.value} value={opt.value}>
                                                {opt.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </TableCell>
                                <TableCell>
                                    {/* <Button
                                        variant="outlined"
                                        size="small"
                                        onClick={() => handleSetMinPrice(item.id, item.defaultPrice, item.quantity)}
                                        disabled={item.quantity <= 0 || lockedMinPrices[item.id]}
                                    >
                                        {bargainingDetails[item.id]?.minPrice && lockedMinPrices[item.id]
                                            ? `$${bargainingDetails[item.id].minPrice}`
                                            : "Set min price"}
                                    </Button> */}
                                  <Button
                                    variant="outlined"
                                    size="small"
                                    onClick={() => handleSetMinPrice(
                                        item.id, 
                                        item.price, 
                                        item.quantity, 
                                        item.product, 
                                        item.category,
                                        item.status   
                                    )}
                                    disabled={item.quantity <= 0 || lockedMinPrices[item.id]}
                                >
                                    {bargainingDetails[item.id]?.minPrice && lockedMinPrices[item.id]
                                        ? `$${bargainingDetails[item.id].minPrice}`
                                        : "Set min price"}
                                </Button>
                                </TableCell>
                                <TableCell > 
                                    <Box display="flex" gap={1}>
                                        <Button
                                            variant="contained"
                                            size="small"
                                            sx={{ textTransform: "none", backgroundColor: "green", color: "#fff" }}
                                            onClick={() => handleSaveMinPrice(item.id)}
                                        >
                                            Save
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="error"
                                            size="small"
                                            sx={{ textTransform: "none" }}
                                            onClick={() => handleDeleteMinPrice(item.id)}
                                            disabled={!lockedMinPrices[item.id]}
                                        >
                                            Delete
                                        </Button>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Grid container justifyContent="space-between" alignItems="center" p={4}>
                <Grid item>
                    <Typography variant="body2" color="textSecondary">
                        Showing {startIndex + 1} to {Math.min(startIndex + entriesPerPage, filteredProducts.length)} of {filteredProducts.length} entries
                    </Typography>
                </Grid>
                <Grid item>
                    <Pagination
                        count={totalPages}
                        page={currentPage}
                        onChange={(e, value) => setCurrentPage(value)}
                        color="primary"
                    />
                </Grid>
            </Grid>
            <SetMinPriceModal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveMinPrice}
                defaultPrice={selectedProduct?.defaultPrice}
                selectedProduct={selectedProduct}
            />
        </Paper>
    );
};

export default InventoryTable;




// import React, { useState } from "react";
// import {
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     Typography,
//     Paper,
//     Select,
//     MenuItem,
//     Pagination,
//     TextField,
//     Button,
//     Grid,
//     Box,
// } from "@mui/material";

// const InventoryTable = () => {
//     const [entriesPerPage, setEntriesPerPage] = useState(10);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [minPrices, setMinPrices] = useState({});

//     const data = Array.from({ length: 12 }, (_, index) => ({
//         id: `#1042${index + 1}`,
//         price: "$140.69",
//         status: index % 2 === 0 ? "Active" : "Inactive",
//         category: "Shirts",
//         product: "Nike Sport V2",
//         behavior: index % 3 === 0 ? "Low" : index % 3 === 1 ? "High" : "Normal",
//     }));

//     const totalPages = Math.ceil(data.length / entriesPerPage);
//     const startIndex = (currentPage - 1) * entriesPerPage;
//     const currentData = data.slice(startIndex, startIndex + entriesPerPage);

//     const handleSetMinPrice = (id) => {
//         const newPrice = prompt(`Set minimum price for ${id}:`);
//         if (newPrice && !isNaN(newPrice)) {
//             setMinPrices((prev) => ({
//                 ...prev,
//                 [id]: `$${parseFloat(newPrice).toFixed(2)}`,
//             }));
//         }
//     };
//     // Function to handle Save action
//     const handleSaveMinPrice = (id) => {
//         if (minPrices[id]) {
//             alert(`Min price for ${id} has been saved: ${minPrices[id]}`);
//         } else {
//             alert(`Please set a min price for ${id} before saving.`);
//         }
//     };

//     // Function to handle Delete action
//     const handleDeleteMinPrice = (id) => {
//         setMinPrices((prev) => ({
//             ...prev,
//             [id]: undefined, // Remove the min price for the specific ID
//         }));
//         alert(`Min price for ${id} has been reset to default.`);
//     };


//     return (
//         <Paper className="p-4">
//             <Typography color="#344767" sx={{ fontFamily: ' sans-serif', fontSize: '18px', pt: 2, ml: 3, fontWeight: "bold" }}>
//                 Inventory Individual Product
//             </Typography>

//             <div style={{ margin: "20px" }}>
//                 {/* Grid layout for Entries per page and Search */}
//                 <Grid container spacing={2}>
//                     <Grid item>
//                         <TextField
//                             select
//                             value={entriesPerPage}
//                             onChange={(e) => setEntriesPerPage(Number(e.target.value))}
//                             size="small"
//                             variant="outlined"
//                             sx={{ width: 60 }}
//                         >
//                             {[5, 10, 15].map((num) => (
//                                 <MenuItem key={num} value={num}>
//                                     {num}
//                                 </MenuItem>
//                             ))}
//                         </TextField>
//                     </Grid>
//                     <Grid item>
//                         <Typography variant="body2">Entries per page</Typography>
//                     </Grid>

//                     <Grid item xs={6} container justifyContent="flex-end">
//                         <TextField
//                             label="Search here"
//                             variant="outlined"
//                             size="small"
//                             sx={{ width: 300 }}
//                         />
//                     </Grid>
//                 </Grid>
//             </div>

//             <TableContainer
//                 component={Paper}
//                 sx={{
//                     boxShadow: 'none', // Removes the box shadow
//                     borderRadius: '0', // Removes the border radius
//                 }}
//             >
//                 <Table>
//                     <TableHead>
//                         <TableRow>
//                             <TableCell sx={{ px: 1 }}>ID</TableCell>
//                             <TableCell sx={{ px: 1 }}>Default Price</TableCell>
//                             <TableCell sx={{ px: 1 }}>Status</TableCell>
//                             <TableCell sx={{ px: 1 }}>Category</TableCell>
//                             <TableCell sx={{ px: 1 }}>Product</TableCell>
//                             <TableCell sx={{ px: 1 }}>Behavior</TableCell>
//                             <TableCell sx={{ px: 1 }}>Set Min Price</TableCell>
//                             <TableCell sx={{ px: 1 }}>Actions</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {currentData.map((item, idx) => (
//                             <TableRow
//                                 key={idx}
//                                 sx={{
//                                     "&:last-child td, &:last-child th": { border: 0 },
//                                     px: 0, // Removes padding along the x-axis
//                                 }}
//                             >
//                                 <TableCell sx={{ px: 1 }}>{item.id}</TableCell>
//                                 <TableCell sx={{ px: 1 }}>{item.price}</TableCell>
//                                 <TableCell sx={{ px: 1 }}>
//                                     <Button
//                                         variant="outlined"
//                                         color={item.status === "Active" ? "success" : "error"}
//                                         size="small"
//                                     >
//                                         {item.status}
//                                     </Button>
//                                 </TableCell>
//                                 <TableCell sx={{ px: 1 }}>{item.category}</TableCell>
//                                 <TableCell sx={{ px: 1 }}>{item.product}</TableCell>
//                                 <TableCell sx={{ px: 1 }}>
//                                     <Select
//                                         value={item.behavior}
//                                         size="small"
//                                         variant="outlined"
//                                         style={{ width: 120 }}
//                                     >
//                                         {[{ label: "Low", value: "Low" }, { label: "High", value: "High" }, { label: "Normal", value: "Normal" }].map((opt) => (
//                                             <MenuItem key={opt.value} value={opt.value}>
//                                                 {opt.label}
//                                             </MenuItem>
//                                         ))}
//                                     </Select>
//                                 </TableCell>
//                                 <TableCell sx={{ px: 1 }}>
//                                     <Button
//                                         variant="outlined"
//                                         size="small"
//                                         onClick={() => handleSetMinPrice(item.id)}
//                                     >
//                                         {minPrices[item.id] || "Set min price"}
//                                     </Button>
//                                 </TableCell>
//                                 <TableCell sx={{ px: 1 }}> {/* Actions Column */}
//                                     <Box display="flex" gap={1}>
//                                         {/* Save Button */}
//                                         <Button
//                                             variant="contained"
//                                             size="small"
//                                             sx={{ textTransform: "none", backgroundColor: "green", color: "#fff" }}
//                                             onClick={() => handleSaveMinPrice(item.id)} // Save Action
//                                         >
//                                             Save
//                                         </Button>

//                                         {/* Delete Button */}
//                                         <Button
//                                             variant="contained"
//                                             color="error"
//                                             size="small"
//                                             sx={{ textTransform: "none" }}
//                                             onClick={() => handleDeleteMinPrice(item.id)} // Delete Action
//                                         >
//                                             Delete
//                                         </Button>
//                                     </Box>
//                                 </TableCell>

//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </TableContainer>

//             <Grid container justifyContent="space-between" alignItems="center" p={4}>
//                 <Grid item>
//                     <Typography variant="body2" color="textSecondary">
//                         {`Showing ${startIndex + 1} to ${Math.min(startIndex + entriesPerPage, data.length)} of ${data.length} entries`}
//                     </Typography>
//                 </Grid>

//                 <Grid item>
//                     <Pagination
//                         count={totalPages}
//                         page={currentPage}
//                         onChange={(e, value) => setCurrentPage(value)}
//                         color="primary"
//                     />
//                 </Grid>
//             </Grid>
//         </Paper>
//     );
// };

// export default InventoryTable;


// import React, { useState, useEffect } from "react";
// import {
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     Typography,
//     Paper,
//     Select,
//     MenuItem,
//     Pagination,
//     TextField,
//     Button,
//     Grid,
//     Box,
// } from "@mui/material";

// const InventoryTable = () => {
//     const [entriesPerPage, setEntriesPerPage] = useState(10);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [minPrices, setMinPrices] = useState({});
//     const [products, setProducts] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [searchTerm, setSearchTerm] = useState("");

//     useEffect(() => {
//         fetchProducts();
//     }, []);

//     const fetchProducts = async () => {
//         try {
//             const token = localStorage.getItem("authToken");

//             if (!token) {
//                 throw new Error("No authentication token found");
//             }

//             const response = await fetch('http://localhost:8000/api/v1/shopify/all-products', {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${token}`
//                 }
//             });

//             if (!response.ok) {
//                 throw new Error(`HTTP error! Status: ${response.status}`);
//             }

//             const result = await response.json();
//             console.log("Fetched Data:", result);

//             // Transform the API data to match our table structure
//             const transformedData = result.data.products.map(product => ({
//                 id: `#${product.id}`,
//                 price: `$${product.price}`,
//                 status: product.inventory_quantity > 0 ? "Active" : "Inactive",
//                 category: product.product_type,
//                 product: product.name,
//                 behavior: "Normal", // Default behavior
//                 quantity: product.inventory_quantity
//             }));

//             setProducts(transformedData);
//             setLoading(false);
//         } catch (err) {
//             console.error("Error fetching products:", err);
//             setError(err.message || "Failed to fetch products");
//             setLoading(false);
//         }
//     };

//     // Filter products based on search term
//     const filteredProducts = products.filter(product =>
//         Object.values(product).some(value =>
//             String(value).toLowerCase().includes(searchTerm.toLowerCase())
//         )
//     );

//     const totalPages = Math.ceil(filteredProducts.length / entriesPerPage);
//     const startIndex = (currentPage - 1) * entriesPerPage;
//     const currentData = filteredProducts.slice(startIndex, startIndex + entriesPerPage);

//     const handleSetMinPrice = (id) => {
//         const newPrice = prompt(`Set minimum price for ${id}:`);
//         if (newPrice && !isNaN(newPrice)) {
//             setMinPrices((prev) => ({
//                 ...prev,
//                 [id]: `$${parseFloat(newPrice).toFixed(2)}`,
//             }));
//         }
//     };

//     const handleSaveMinPrice = (id) => {
//         if (minPrices[id]) {
//             alert(`Min price for ${id} has been saved: ${minPrices[id]}`);
//         } else {
//             alert(`Please set a min price for ${id} before saving.`);
//         }
//     };

//     const handleDeleteMinPrice = (id) => {
//         setMinPrices((prev) => {
//             const newPrices = { ...prev };
//             delete newPrices[id];
//             return newPrices;
//         });
//         alert(`Min price for ${id} has been reset to default.`);
//     };

//     if (loading) return (
//         <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
//             <Typography>Loading products...</Typography>
//         </Box>
//     );

//     if (error) return (
//         <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
//             <Typography color="error">Error: {error}</Typography>
//         </Box>
//     );

//     return (
//         <Paper className="p-4">
//             <Typography color="#344767" sx={{ fontFamily: 'sans-serif', fontSize: '18px', pt: 2, ml: 3, fontWeight: "bold" }}>
//                 Inventory Individual Product
//             </Typography>

//             <div style={{ margin: "20px" }}>
//                 <Grid container spacing={2}>
//                     <Grid item>
//                         <TextField
//                             select
//                             value={entriesPerPage}
//                             onChange={(e) => setEntriesPerPage(Number(e.target.value))}
//                             size="small"
//                             variant="outlined"
//                             sx={{ width: 60 }}
//                         >
//                             {[5, 10, 15].map((num) => (
//                                 <MenuItem key={num} value={num}>
//                                     {num}
//                                 </MenuItem>
//                             ))}
//                         </TextField>
//                     </Grid>
//                     <Grid item>
//                         <Typography variant="body2">Entries per page</Typography>
//                     </Grid>

//                     <Grid item xs={6} container justifyContent="flex-end">
//                         <TextField
//                             label="Search here"
//                             variant="outlined"
//                             size="small"
//                             sx={{ width: 300 }}
//                             value={searchTerm}
//                             onChange={(e) => setSearchTerm(e.target.value)}
//                         />
//                     </Grid>
//                 </Grid>
//             </div>

//             <TableContainer component={Paper} sx={{ boxShadow: 'none', borderRadius: '0' }}>
//                 <Table>
//                     <TableHead>
//                         <TableRow>
//                             <TableCell sx={{ px: 1 }}>ID</TableCell>
//                             <TableCell sx={{ px: 1 }}>Default Price</TableCell>
//                             <TableCell sx={{ px: 1 }}>Status</TableCell>
//                             <TableCell sx={{ px: 1 }}>Category</TableCell>
//                             <TableCell sx={{ px: 1 }}>Product</TableCell>
//                             <TableCell sx={{ px: 1 }}>Quantity</TableCell>
//                             <TableCell sx={{ px: 1 }}>Behavior</TableCell>
//                             <TableCell sx={{ px: 1 }}>Set Min Price</TableCell>
//                             <TableCell sx={{ px: 1 }}>Actions</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {currentData.map((item, idx) => (
//                             <TableRow key={idx} sx={{ "&:last-child td, &:last-child th": { border: 0 }, px: 0 }}>
//                                 <TableCell sx={{ px: 1 }}>{item.id}</TableCell>
//                                 <TableCell sx={{ px: 1 }}>{item.price}</TableCell>
//                                 <TableCell sx={{ px: 1 }}>
//                                     <Button
//                                         variant="outlined"
//                                         color={item.status === "Active" ? "success" : "error"}
//                                         size="small"
//                                     >
//                                         {item.status}
//                                     </Button>
//                                 </TableCell>
//                                 <TableCell sx={{ px: 1 }}>{item.category}</TableCell>
//                                 <TableCell sx={{ px: 1 }}>{item.product}</TableCell>
//                                 <TableCell sx={{ px: 1 }}>{item.quantity}</TableCell>
//                                 <TableCell sx={{ px: 1 }}>
//                                     <Select
//                                         value={item.behavior}
//                                         size="small"
//                                         variant="outlined"
//                                         style={{ width: 120 }}
//                                     >
//                                         {["Low", "High", "Normal"].map((opt) => (
//                                             <MenuItem key={opt} value={opt}>
//                                                 {opt}
//                                             </MenuItem>
//                                         ))}
//                                     </Select>
//                                 </TableCell>
//                                 <TableCell sx={{ px: 1 }}>
//                                     <Button
//                                         variant="outlined"
//                                         size="small"
//                                         onClick={() => handleSetMinPrice(item.id)}
//                                     >
//                                         {minPrices[item.id] || "Set min price"}
//                                     </Button>
//                                 </TableCell>
//                                 <TableCell sx={{ px: 1 }}>
//                                     <Box display="flex" gap={1}>
//                                         <Button
//                                             variant="contained"
//                                             size="small"
//                                             sx={{ textTransform: "none", backgroundColor: "green", color: "#fff" }}
//                                             onClick={() => handleSaveMinPrice(item.id)}
//                                         >
//                                             Save
//                                         </Button>
//                                         <Button
//                                             variant="contained"
//                                             color="error"
//                                             size="small"
//                                             sx={{ textTransform: "none" }}
//                                             onClick={() => handleDeleteMinPrice(item.id)}
//                                         >
//                                             Delete
//                                         </Button>
//                                     </Box>
//                                 </TableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </TableContainer>

//             <Grid container justifyContent="space-between" alignItems="center" p={4}>
//                 <Grid item>
//                     <Typography variant="body2" color="textSecondary">
//                         {`Showing ${startIndex + 1} to ${Math.min(startIndex + entriesPerPage, filteredProducts.length)} of ${filteredProducts.length} entries`}
//                     </Typography>
//                 </Grid>

//                 <Grid item>
//                     <Pagination
//                         count={totalPages}
//                         page={currentPage}
//                         onChange={(e, value) => setCurrentPage(value)}
//                         color="primary"
//                     />
//                 </Grid>
//             </Grid>
//         </Paper>
//     );
// };

// export default InventoryTable;



// import React, { useState, useEffect } from "react";
// import {
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     Typography,
//     Paper,
//     Select,
//     MenuItem,
//     Pagination,
//     TextField,
//     Button,
//     Grid,
//     Box,
// } from "@mui/material";

// const InventoryTable = () => {
//     const [entriesPerPage, setEntriesPerPage] = useState(10);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [products, setProducts] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [searchTerm, setSearchTerm] = useState("");
//     const [bargainingDetails, setBargainingDetails] = useState({});

//     useEffect(() => {
//         fetchProducts();
//         fetchBargainingDetails();
//     }, []);

//     const fetchBargainingDetails = async () => {
//         try {
//             const token = localStorage.getItem("authToken");
//             const response = await fetch('http://localhost:8000/api/v1/bargaining/details', {
//                 headers: {
//                     'Authorization': `Bearer ${token}`
//                 }
//             });
//             const data = await response.json();

//             const detailsMap = {};
//             data.data.forEach(detail => {
//                 detailsMap[detail.productId] = {
//                     minPrice: detail.minPrice,
//                     behavior: detail.behavior,
//                     isActive: detail.isAvailable
//                 };
//             });
//             setBargainingDetails(detailsMap);
//         } catch (error) {
//             console.error("Error fetching bargaining details:", error);
//         }
//     };

//     const fetchProducts = async () => {
//         try {
//             const token = localStorage.getItem("authToken");
//             if (!token) {
//                 throw new Error("No authentication token found");
//             }

//             const response = await fetch('http://localhost:8000/api/v1/shopify/all-products', {
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${token}`
//                 }
//             });

//             if (!response.ok) {
//                 throw new Error(`HTTP error! Status: ${response.status}`);
//             }

//             const result = await response.json();

//             const transformedData = result.data.products.map(product => ({
//                 id: product.id,
//                 price: `$${product.price}`,
//                 status: bargainingDetails[product.id]?.isActive ? "Active" : "Inactive",
//                 category: product.product_type,
//                 product: product.name,
//                 behavior: bargainingDetails[product.id]?.behavior || "Normal",
//                 quantity: product.inventory_quantity,
//                 minPrice: bargainingDetails[product.id]?.minPrice || ""
//             }));

//             setProducts(transformedData);
//             setLoading(false);
//         } catch (err) {
//             console.error("Error fetching products:", err);
//             setError(err.message || "Failed to fetch products");
//             setLoading(false);
//         }
//     };

//     const handleSetMinPrice = async (id) => {
//         const newPrice = prompt(`Set minimum price for ${id}:`);
//         if (newPrice && !isNaN(newPrice)) {
//             try {
//                 const token = localStorage.getItem("authToken");
//                 const response = await fetch('http://localhost:8000/api/v1/bargaining/set-min-price', {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'Authorization': `Bearer ${token}`
//                     },
//                     body: JSON.stringify({
//                         productId: id,
//                         minPrice: parseFloat(newPrice)
//                     })
//                 });

//                 if (!response.ok) {
//                     throw new Error('Failed to set min price');
//                 }

//                 const result = await response.json();

//                 // Update local state with the response data
//                 setBargainingDetails(prev => ({
//                     ...prev,
//                     [id]: {
//                         ...prev[id],
//                         minPrice: result.data.minPrice,
//                         isActive: result.data.isActive
//                     }
//                 }));

//                 await fetchProducts();
//                 alert("Minimum price set successfully");

//             } catch (error) {
//                 console.error("Error setting min price:", error);
//                 alert("Failed to set minimum price");
//             }
//         }
//     };

//     const handleSaveMinPrice = async (id) => {
//         try {
//             if (!bargainingDetails[id]?.minPrice) {
//                 alert("Please set a min price first");
//                 return;
//             }

//             const token = localStorage.getItem("authToken");
//             const response = await fetch('http://localhost:8000/api/v1/bargaining/set-min-price', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${token}`
//                 },
//                 body: JSON.stringify({
//                     productId: id,
//                     minPrice: bargainingDetails[id].minPrice
//                 })
//             });

//             if (!response.ok) {
//                 throw new Error('Failed to save min price');
//             }

//             const result = await response.json();

//             // Update local state with the response data
//             setBargainingDetails(prev => ({
//                 ...prev,
//                 [id]: {
//                     ...prev[id],
//                     minPrice: result.data.minPrice,
//                     isActive: result.data.isActive
//                 }
//             }));

//             await fetchProducts();
//             alert("Min price saved successfully");

//         } catch (error) {
//             console.error("Error saving min price:", error);
//             alert("Failed to save minimum price");
//         }
//     };

//     const handleDeleteMinPrice = async (id) => {
//         try {
//             const token = localStorage.getItem("authToken");
//             const response = await fetch(`http://localhost:8000/api/v1/bargaining/delete/${id}`, {
//                 method: 'DELETE',
//                 headers: {
//                     'Authorization': `Bearer ${token}`
//                 }
//             });

//             if (!response.ok) {
//                 throw new Error('Failed to delete min price');
//             }

//             const result = await response.json();

//             // Update local state with the response data
//             setBargainingDetails(prev => ({
//                 ...prev,
//                 [id]: {
//                     ...prev[id],
//                     isActive: result.data.isActive
//                 }
//             }));

//             await fetchProducts();
//             alert("Min price marked as inactive successfully");

//         } catch (error) {
//             console.error("Error marking min price as inactive:", error);
//             alert("Failed to mark minimum price as inactive");
//         }
//     };
//     // Rest of the component remains the same...
//     const filteredProducts = products.filter(product =>
//         Object.values(product).some(value =>
//             String(value).toLowerCase().includes(searchTerm.toLowerCase())
//         )
//     );

//     const totalPages = Math.ceil(filteredProducts.length / entriesPerPage);
//     const startIndex = (currentPage - 1) * entriesPerPage;
//     const currentData = filteredProducts.slice(startIndex, startIndex + entriesPerPage);

//     if (loading) return (
//         <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
//             <Typography>Loading products...</Typography>
//         </Box>
//     );

//     if (error) return (
//         <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
//             <Typography color="error">Error: {error}</Typography>
//         </Box>
//     );
//     return (
//         <Paper className="p-4">
//             <Typography color="#344767" sx={{ fontFamily: 'sans-serif', fontSize: '18px', pt: 2, ml: 3, fontWeight: "bold" }}>
//                 Inventory Individual Product
//             </Typography>

//             <div style={{ margin: "20px" }}>
//                 <Grid container spacing={2}>
//                     <Grid item>
//                         <TextField
//                             select
//                             value={entriesPerPage}
//                             onChange={(e) => setEntriesPerPage(Number(e.target.value))}
//                             size="small"
//                             variant="outlined"
//                             sx={{ width: 60 }}
//                         >
//                             {[5, 10, 15].map((num) => (
//                                 <MenuItem key={num} value={num}>
//                                     {num}
//                                 </MenuItem>
//                             ))}
//                         </TextField>
//                     </Grid>
//                     <Grid item>
//                         <Typography variant="body2">Entries per page</Typography>
//                     </Grid>

//                     <Grid item xs={6} container justifyContent="flex-end">
//                         <TextField
//                             label="Search here"
//                             variant="outlined"
//                             size="small"
//                             sx={{ width: 300 }}
//                             value={searchTerm}
//                             onChange={(e) => setSearchTerm(e.target.value)}
//                         />
//                     </Grid>
//                 </Grid>
//             </div>

//             <TableContainer component={Paper} sx={{ boxShadow: 'none', borderRadius: '0' }}>
//                 <Table>
//                     <TableHead>
//                         <TableRow>
//                             <TableCell sx={{ px: 1 }}>ID</TableCell>
//                             <TableCell sx={{ px: 1 }}>Default Price</TableCell>
//                             <TableCell sx={{ px: 1 }}>Status</TableCell>
//                             <TableCell sx={{ px: 1 }}>Category</TableCell>
//                             <TableCell sx={{ px: 1 }}>Product</TableCell>
//                             <TableCell sx={{ px: 1 }}>Quantity</TableCell>
//                             <TableCell sx={{ px: 1 }}>Behavior</TableCell>
//                             <TableCell sx={{ px: 1 }}>Set Min Price</TableCell>
//                             <TableCell sx={{ px: 1 }}>Actions</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {currentData.map((item, idx) => (
//                             <TableRow key={idx} sx={{ "&:last-child td, &:last-child th": { border: 0 }, px: 0 }}>
//                                 <TableCell sx={{ px: 1 }}>{item.id}</TableCell>
//                                 <TableCell sx={{ px: 1 }}>{item.price}</TableCell>
//                                 <TableCell sx={{ px: 1 }}>
//                                     <Button
//                                         variant="outlined"
//                                         color={bargainingDetails[item.id]?.isActive ? "success" : "error"}
//                                         size="small"
//                                     >
//                                         {bargainingDetails[item.id]?.isActive ? "Active" : "Inactive"}
//                                     </Button>
//                                 </TableCell>
//                                 <TableCell sx={{ px: 1 }}>{item.category}</TableCell>
//                                 <TableCell sx={{ px: 1 }}>{item.product}</TableCell>
//                                 <TableCell sx={{ px: 1 }}>{item.quantity}</TableCell>
//                                 <TableCell sx={{ px: 1 }}>
//                                     <Select
//                                         value={item.behavior}
//                                         size="small"
//                                         variant="outlined"
//                                         style={{ width: 120 }}
//                                     >
//                                         {["Low", "High", "Normal"].map((opt) => (
//                                             <MenuItem key={opt} value={opt}>
//                                                 {opt}
//                                             </MenuItem>
//                                         ))}
//                                     </Select>
//                                 </TableCell>
//                                 <TableCell sx={{ px: 1 }}>
//                                     <Button
//                                         variant="outlined"
//                                         size="small"
//                                         onClick={() => handleSetMinPrice(item.id)}
//                                     >
//                                         {bargainingDetails[item.id]?.minPrice
//                                             ? `$${bargainingDetails[item.id].minPrice}`
//                                             : "Set min price"}
//                                     </Button>
//                                 </TableCell>
//                                 <TableCell sx={{ px: 1 }}>
//                                     <Box display="flex" gap={1}>
//                                         <Button
//                                             variant="contained"
//                                             size="small"
//                                             sx={{ textTransform: "none", backgroundColor: "green", color: "#fff" }}
//                                             onClick={() => handleSaveMinPrice(item.id)}
//                                         >
//                                             Save
//                                         </Button>
//                                         <Button
//                                             variant="contained"
//                                             color="error"
//                                             size="small"
//                                             sx={{ textTransform: "none" }}
//                                             onClick={() => handleDeleteMinPrice(item.id)}
//                                         >
//                                             Delete
//                                         </Button>
//                                     </Box>
//                                 </TableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </TableContainer>

//             <Grid container justifyContent="space-between" alignItems="center" p={4}>
//                 <Grid item>
//                     <Typography variant="body2" color="textSecondary">
//                         {`Showing ${startIndex + 1} to ${Math.min(startIndex + entriesPerPage, filteredProducts.length)} of ${filteredProducts.length} entries`}
//                     </Typography>
//                 </Grid>

//                 <Grid item>
//                     <Pagination
//                         count={totalPages}
//                         page={currentPage}
//                         onChange={(e, value) => setCurrentPage(value)}
//                         color="primary"
//                     />
//                 </Grid>
//             </Grid>
//         </Paper>
//     );
// };

// export default InventoryTable;


// import React, { useState, useEffect } from "react";
// import {
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     Typography,
//     Paper,
//     MenuItem,
//     Pagination,
//     TextField,
//     Button,
//     Grid,
//     Box,
//     IconButton,
//     Switch,
// } from "@mui/material";
// import { RefreshCw } from "lucide-react";

// const InventoryTable = () => {
//     const [entriesPerPage, setEntriesPerPage] = useState(10);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [products, setProducts] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [searchTerm, setSearchTerm] = useState("");
//     const [bargainingDetails, setBargainingDetails] = useState({});
//     const [refreshKey, setRefreshKey] = useState(0);

//     // Load saved state from localStorage
//     useEffect(() => {
//         const savedBargainingDetails = localStorage.getItem('bargainingDetails');
//         if (savedBargainingDetails) {
//             setBargainingDetails(JSON.parse(savedBargainingDetails));
//         }
//     }, []);

//     const handleRefresh = () => {
//         setRefreshKey(prevKey => prevKey + 1);
//         setLoading(true);
//     };

//     const fetchBargainingDetails = async () => {
//         try {
//             const token = localStorage.getItem("authToken");
//             const response = await fetch(`http://localhost:8000/api/v1/bargaining/details?timestamp=${Date.now()}`, {
//                 method: "GET",
//                 headers: {
//                     "Authorization": `Bearer ${token}`,
//                     "Cache-Control": "no-cache, no-store, must-revalidate",
//                     "Pragma": "no-cache",
//                     "Expires": "0"
//                 }
//             });

//             if (!response.ok) {
//                 const errorMessage = await response.text();
//                 console.error(`HTTP Error: ${response.status} - ${errorMessage}`);
//                 throw new Error(`Error ${response.status}: ${errorMessage}`);
//             }

//             return await response.json();
//         } catch (error) {
//             console.error("Error fetching bargaining details:", error);
//             throw error;
//         }
//     };

//     const fetchProducts = async () => {
//         try {
//             const token = localStorage.getItem("authToken");
//             if (!token) {
//                 throw new Error("No authentication token found");
//             }

//             const response = await fetch(`http://localhost:8000/api/v1/shopify/all-products?timestamp=${Date.now()}`, {
//                 method: "GET",
//                 headers: {
//                     "Content-Type": "application/json",
//                     "Authorization": `Bearer ${token}`,
//                     "Cache-Control": "no-cache, no-store, must-revalidate",
//                     "Pragma": "no-cache",
//                     "Expires": "0"
//                 }
//             });

//             if (!response.ok) {
//                 const errorMessage = await response.text();
//                 console.error(`HTTP Error: ${response.status} - ${errorMessage}`);
//                 throw new Error(`Error ${response.status}: ${errorMessage}`);
//             }

//             return await response.json();
//         } catch (err) {
//             console.error("Error fetching products:", err);
//             throw err;
//         }
//     };

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 setLoading(true);

//                 // Fetch data from both APIs
//                 const [productsResponse, bargainingDetailsResponse] = await Promise.all([
//                     fetchProducts(),
//                     fetchBargainingDetails()
//                 ]);

//                 const bargainingDetailsMap = bargainingDetailsResponse.data.reduce((map, detail) => {
//                     map[detail.productId] = {
//                         minPrice: detail.minPrice,
//                         behavior: detail.behavior,
//                         isActive: false  // Initially set all products as inactive
//                     };
//                     return map;
//                 }, {});

//                 const transformedData = productsResponse.data.products.map(product => ({
//                     id: product.id,
//                     price: `$${product.price}`,
//                     status: bargainingDetailsMap[product.id]?.isActive ? "Active" : "Inactive",
//                     category: product.product_type,
//                     product: product.name,
//                     behavior: "Normal",
//                     quantity: product.inventory_quantity,
//                     minPrice: bargainingDetailsMap[product.id]?.minPrice || "",
//                     defaultPrice: parseFloat(product.price)
//                 }));

//                 // Restore previously saved active status if exists
//                 const savedBargainingDetails = JSON.parse(localStorage.getItem('bargainingDetails') || '{}');
//                 const updatedBargainingDetailsMap = { ...bargainingDetailsMap };
//                 Object.keys(savedBargainingDetails).forEach(key => {
//                     if (updatedBargainingDetailsMap[key]) {
//                         updatedBargainingDetailsMap[key].isActive = savedBargainingDetails[key].isActive;
//                     }
//                 });

//                 setProducts(transformedData);
//                 setBargainingDetails(updatedBargainingDetailsMap);
//                 setLoading(false);
//             } catch (err) {
//                 console.error("Error fetching data:", err);
//                 setError(err.message || "Failed to fetch data");
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, [refreshKey]);

//     const handleToggleActive = async (id) => {
//         const currentActiveCount = Object.values(bargainingDetails).filter(detail => detail.isActive).length;
//         const isCurrentlyActive = bargainingDetails[id]?.isActive;

//         // If not currently active and already at max active products, show error
//         if (!isCurrentlyActive && currentActiveCount >= 10) {
//             alert("Maximum 10 products can be active at a time!");
//             return;
//         }

//         // Create a copy of the current bargaining details
//         const updatedBargainingDetails = { ...bargainingDetails };
//         updatedBargainingDetails[id] = {
//             ...updatedBargainingDetails[id],
//             isActive: !isCurrentlyActive
//         };

//         // If turning off, simply update
//         if (isCurrentlyActive) {
//             setBargainingDetails(updatedBargainingDetails);
//             localStorage.setItem('bargainingDetails', JSON.stringify(updatedBargainingDetails));
//             return;
//         }

//         // If turning on, check active count
//         const newActiveCount = Object.values(updatedBargainingDetails).filter(detail => detail.isActive).length;
//         if (newActiveCount > 10) {
//             alert("Maximum 10 products can be active at a time!");
//             return;
//         }

//         // Update state and localStorage
//         setBargainingDetails(updatedBargainingDetails);
//         localStorage.setItem('bargainingDetails', JSON.stringify(updatedBargainingDetails));
//     };


//     const handleSetMinPrice = async (id, defaultPrice, quantity) => {
//         if (quantity <= 0) {
//             alert("Cannot set minimum price for products with no inventory!");
//             return;
//         }

//         // Check the current number of active products
//         const currentActiveCount = Object.values(bargainingDetails).filter(detail => detail.isActive).length;

//         // If already at max active products and this product is not active
//         if (currentActiveCount >= 10 && !bargainingDetails[id]?.isActive) {
//             alert("Maximum 10 products can be active at a time!");
//             return;
//         }

//         const newPrice = prompt("Set minimum price:");
//         if (newPrice && !isNaN(newPrice)) {
//             const numericPrice = parseFloat(newPrice);
//             const numericDefaultPrice = parseFloat(defaultPrice);

//             if (numericPrice >= numericDefaultPrice) {
//                 alert("Minimum price must be less than the default price!");
//                 return;
//             }

//             try {
//                 const token = localStorage.getItem("authToken");
//                 const response = await fetch('http://localhost:8000/api/v1/bargaining/set-min-price', {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'Authorization': `Bearer ${token}`
//                     },
//                     body: JSON.stringify({
//                         productId: id,
//                         minPrice: numericPrice
//                     })
//                 });

//                 if (!response.ok) {
//                     throw new Error('Failed to set min price');
//                 }

//                 const result = await response.json();

//                 const updatedBargainingDetails = {
//                     ...bargainingDetails,
//                     [id]: {
//                         ...bargainingDetails[id],
//                         minPrice: result.data.minPrice,
//                         isActive: true  // Automatically set to active
//                     }
//                 };

//                 setBargainingDetails(updatedBargainingDetails);
//                 localStorage.setItem('bargainingDetails', JSON.stringify(updatedBargainingDetails));

//                 await fetchProducts();
//                 alert("Minimum price set successfully. Product is now active.");

//             } catch (error) {
//                 console.error("Error setting min price:", error);
//                 alert("Failed to set minimum price");
//             }
//         }
//     };

//     const handleDeleteMinPrice = async (id) => {
//         try {
//             const token = localStorage.getItem("authToken");
//             const response = await fetch(`http://localhost:8000/api/v1/bargaining/delete/${id}`, {
//                 method: 'DELETE',
//                 headers: {
//                     'Authorization': `Bearer ${token}`
//                 }
//             });

//             if (!response.ok) {
//                 throw new Error('Failed to delete min price');
//             }

//             const updatedBargainingDetails = {
//                 ...bargainingDetails,
//                 [id]: {
//                     ...bargainingDetails[id],
//                     minPrice: "",
//                     isActive: false
//                 }
//             };

//             setBargainingDetails(updatedBargainingDetails);
//             localStorage.setItem('bargainingDetails', JSON.stringify(updatedBargainingDetails));

//             await fetchProducts();
//             alert("Min price reset successfully");

//         } catch (error) {
//             console.error("Error resetting min price:", error);
//             alert("Failed to reset minimum price");
//         }
//     };

//     const filteredProducts = products.filter(product =>
//         Object.values(product).some(value =>
//             String(value).toLowerCase().includes(searchTerm.toLowerCase())
//         )
//     );

//     const totalPages = Math.ceil(filteredProducts.length / entriesPerPage);
//     const startIndex = (currentPage - 1) * entriesPerPage;
//     const currentData = filteredProducts.slice(startIndex, startIndex + entriesPerPage);

//     if (loading) return (
//         <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
//             <Typography>Loading products...</Typography>
//         </Box>
//     );

//     if (error) return (
//         <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
//             <Typography color="error">Error: {error}</Typography>
//         </Box>
//     );

//     return (
//         <Paper className="p-4">
//             <Grid container alignItems="center" sx={{ pt: 2, px: 3 }}>
//                 <Grid item xs>
//                     <Typography variant="h6" sx={{ fontFamily: 'sans-serif', fontWeight: "bold", color: "#344767" }}>
//                         Inventory Individual Product
//                     </Typography>
//                 </Grid>
//                 <Grid item>
//                     <IconButton onClick={handleRefresh} color="primary">
//                         <RefreshCw className={loading ? "animate-spin" : ""} />
//                     </IconButton>
//                 </Grid>
//             </Grid>

//             <div style={{ margin: "20px" }}>
//                 <Grid container spacing={2} alignItems="center">
//                     <Grid item>
//                         <TextField
//                             select
//                             value={entriesPerPage}
//                             onChange={(e) => setEntriesPerPage(Number(e.target.value))}
//                             size="small"
//                             variant="outlined"
//                             sx={{ width: 60 }}
//                         >
//                             {[5, 10, 15].map((num) => (
//                                 <MenuItem key={num} value={num}>
//                                     {num}
//                                 </MenuItem>
//                             ))}
//                         </TextField>
//                     </Grid>
//                     <Grid item>
//                         <Typography variant="body2">Entries per page</Typography>
//                     </Grid>
//                     <Grid item xs />
//                     <Grid item>
//                         <TextField
//                             label="Search here"
//                             variant="outlined"
//                             size="small"
//                             value={searchTerm}
//                             onChange={(e) => setSearchTerm(e.target.value)}
//                             sx={{ width: 300 }}
//                         />
//                     </Grid>
//                 </Grid>
//             </div>

//             <TableContainer component={Paper} sx={{ boxShadow: 'none', borderRadius: '0' }}>
//                 <Table>
//                     <TableHead>
//                         <TableRow>
//                             <TableCell>ID</TableCell>
//                             <TableCell>Default Price</TableCell>
//                             <TableCell>Status</TableCell>
//                             <TableCell>Category</TableCell>
//                             <TableCell>Product</TableCell>
//                             <TableCell>Quantity</TableCell>
//                             <TableCell>Behavior</TableCell>
//                             <TableCell>Min Price</TableCell>
//                             <TableCell>Actions</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {currentData.map((item) => (
//                             <TableRow key={item.id}>
//                                 <TableCell>{item.id}</TableCell>
//                                 <TableCell>{item.price}</TableCell>
//                                 <TableCell>
//                                     <Switch
//                                         checked={bargainingDetails[item.id]?.isActive || false}
//                                         onChange={() => handleToggleActive(item.id)}
//                                         disabled={item.quantity <= 0}
//                                     />
//                                 </TableCell>
//                                 <TableCell>{item.category}</TableCell>
//                                 <TableCell>{item.product}</TableCell>
//                                 <TableCell>{item.quantity}</TableCell>
//                                 <TableCell>Normal</TableCell>
//                                 <TableCell>
//                                     <Button
//                                         variant="outlined"
//                                         size="small"
//                                         onClick={() => handleSetMinPrice(item.id, item.defaultPrice, item.quantity)}
//                                         disabled={item.quantity <= 0}
//                                     >
//                                         {bargainingDetails[item.id]?.minPrice
//                                             ? `$${bargainingDetails[item.id].minPrice}`
//                                             : "Set min price"}
//                                     </Button>
//                                 </TableCell>
//                                 <TableCell>
//                                     <Button
//                                         variant="contained"
//                                         color="error"
//                                         size="small"
//                                         onClick={() => handleDeleteMinPrice(item.id)}
//                                     >
//                                         Delete
//                                     </Button>
//                                 </TableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </TableContainer>

//             <Grid container justifyContent="space-between" alignItems="center" p={4}>
//                 <Grid item>
//                     <Typography variant="body2" color="textSecondary">
//                         Showing {startIndex + 1} to {Math.min(startIndex + entriesPerPage, filteredProducts.length)} of {filteredProducts.length} entries
//                     </Typography>
//                 </Grid>
//                 <Grid item>
//                     <Pagination
//                         count={totalPages}
//                         page={currentPage}
//                         onChange={(e, value) => setCurrentPage(value)}
//                         color="primary"
//                     />
//                 </Grid>
//             </Grid>
//         </Paper>
//     );
// };

// export default InventoryTable;



// import React, { useState, useEffect } from "react";
// import {
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     Typography,
//     Paper,
//     MenuItem,
//     Pagination,
//     TextField,
//     Button,
//     Grid,
//     Box,
//     IconButton,
//     Switch,
// } from "@mui/material";
// import { RefreshCw } from "lucide-react";

// const InventoryTable = () => {
//     const [entriesPerPage, setEntriesPerPage] = useState(10);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [products, setProducts] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [searchTerm, setSearchTerm] = useState("");
//     const [bargainingDetails, setBargainingDetails] = useState({});
//     const [refreshKey, setRefreshKey] = useState(0);
//     const [lockedMinPrices, setLockedMinPrices] = useState({});

//     // Load saved state from localStorage
//     useEffect(() => {
//         const savedBargainingDetails = localStorage.getItem('bargainingDetails');
//         const savedLockedMinPrices = localStorage.getItem('lockedMinPrices');
//         if (savedBargainingDetails) {
//             setBargainingDetails(JSON.parse(savedBargainingDetails));
//         }
//         if (savedLockedMinPrices) {
//             setLockedMinPrices(JSON.parse(savedLockedMinPrices));
//         }
//     }, []);

//     const handleRefresh = () => {
//         setRefreshKey(prevKey => prevKey + 1);
//         setLoading(true);
//     };

//     const fetchBargainingDetails = async () => {
//         try {
//             const token = localStorage.getItem("authToken");
//             const response = await fetch(`http://localhost:8000/api/v1/bargaining/details?timestamp=${Date.now()}`, {
//                 method: "GET",
//                 headers: {
//                     "Authorization": `Bearer ${token}`,
//                     "Cache-Control": "no-cache, no-store, must-revalidate",
//                     "Pragma": "no-cache",
//                     "Expires": "0"
//                 }
//             });

//             if (!response.ok) {
//                 const errorMessage = await response.text();
//                 console.error(`HTTP Error: ${response.status} - ${errorMessage}`);
//                 throw new Error(`Error ${response.status}: ${errorMessage}`);
//             }

//             return await response.json();
//         } catch (error) {
//             console.error("Error fetching bargaining details:", error);
//             throw error;
//         }
//     };

//     const fetchProducts = async () => {
//         try {
//             const token = localStorage.getItem("authToken");
//             if (!token) {
//                 throw new Error("No authentication token found");
//             }

//             const response = await fetch(`http://localhost:8000/api/v1/shopify/all-products?timestamp=${Date.now()}`, {
//                 method: "GET",
//                 headers: {
//                     "Content-Type": "application/json",
//                     "Authorization": `Bearer ${token}`,
//                     "Cache-Control": "no-cache, no-store, must-revalidate",
//                     "Pragma": "no-cache",
//                     "Expires": "0"
//                 }
//             });

//             if (!response.ok) {
//                 const errorMessage = await response.text();
//                 console.error(`HTTP Error: ${response.status} - ${errorMessage}`);
//                 throw new Error(`Error ${response.status}: ${errorMessage}`);
//             }

//             return await response.json();
//         } catch (err) {
//             console.error("Error fetching products:", err);
//             throw err;
//         }
//     };

//     // const fetchProducts = async () => {
//     //     try {
//     //         const token = localStorage.getItem("authToken");
//     //         if (!token) {
//     //             throw new Error("No authentication token found");
//     //         }

//     //         // Add a random query parameter to prevent caching
//     //         const url = `http://localhost:8000/api/v1/shopify/all-products?rand=${Math.random()}`;

//     //         const response = await fetch(url, {
//     //             method: "GET",
//     //             headers: {
//     //                 "Content-Type": "application/json",
//     //                 "Authorization": `Bearer ${token}`,
//     //                 "Cache-Control": "no-cache, no-store, must-revalidate",
//     //                 "Pragma": "no-cache",
//     //                 "Expires": "0"
//     //             }
//     //         });

//     //         if (!response.ok) {
//     //             const errorMessage = await response.text();
//     //             console.error(`HTTP Error: ${response.status} - ${errorMessage}`);
//     //             throw new Error(`Error ${response.status}: ${errorMessage}`);
//     //         }

//     //         const data = await response.json();
//     //         console.log("Fetched products:", data); // Debugging
//     //         return data;
//     //     } catch (err) {
//     //         console.error("Error fetching products:", err);
//     //         throw err;
//     //     }
//     // };

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 setLoading(true);

//                 // Fetch data from both APIs
//                 const [productsResponse, bargainingDetailsResponse] = await Promise.all([
//                     fetchProducts(),
//                     fetchBargainingDetails()
//                 ]);

//                 // Create a map of bargaining details with the latest information
//                 const bargainingDetailsMap = bargainingDetailsResponse.data.reduce((map, detail) => {
//                     map[detail.productId] = {
//                         minPrice: detail.minPrice,
//                         behavior: detail.behavior,
//                         isActive: false  // Initially set all products as inactive
//                     };
//                     return map;
//                 }, {});

//                 // Retrieve saved bargaining details from localStorage
//                 const savedBargainingDetails = JSON.parse(localStorage.getItem('bargainingDetails') || '{}');
//                 const savedLockedMinPrices = JSON.parse(localStorage.getItem('lockedMinPrices') || '{}');

//                 const transformedData = productsResponse.data.products.map(product => {
//                     // Prioritize the most recent min price from the server or localStorage
//                     const serverMinPrice = bargainingDetailsMap[product.id]?.minPrice;
//                     const localMinPrice = savedBargainingDetails[product.id]?.minPrice;
//                     const minPrice = serverMinPrice || localMinPrice || "";

//                     return {
//                         id: product.id,
//                         price: `$${product.price}`,
//                         status: bargainingDetailsMap[product.id]?.isActive ? "Active" : "Inactive",
//                         category: product.product_type,
//                         product: product.name,
//                         behavior: "Normal",
//                         quantity: product.inventory_quantity,
//                         minPrice: minPrice,
//                         defaultPrice: parseFloat(product.price)
//                     };
//                 });

//                 // Update bargaining details with the latest information
//                 const updatedBargainingDetails = { ...bargainingDetailsMap };
//                 Object.keys(savedBargainingDetails).forEach(key => {
//                     if (updatedBargainingDetails[key]) {
//                         updatedBargainingDetails[key].isActive = savedBargainingDetails[key].isActive;
//                     }
//                 });

//                 setProducts(transformedData);
//                 setBargainingDetails(updatedBargainingDetails);
//                 setLockedMinPrices(savedLockedMinPrices);
//                 setLoading(false);
//             } catch (err) {
//                 console.error("Error fetching data:", err);
//                 setError(err.message || "Failed to fetch data");
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, [refreshKey]);


//     const handleToggleActive = async (id) => {
//         const currentActiveCount = Object.values(bargainingDetails).filter(detail => detail.isActive).length;
//         const isCurrentlyActive = bargainingDetails[id]?.isActive;

//         // If not currently active and already at max active products, show error
//         if (!isCurrentlyActive && currentActiveCount >= 10) {
//             alert("Maximum 10 products can be active at a time!");
//             return;
//         }

//         // Create a copy of the current bargaining details
//         const updatedBargainingDetails = { ...bargainingDetails };
//         updatedBargainingDetails[id] = {
//             ...updatedBargainingDetails[id],
//             isActive: !isCurrentlyActive
//         };

//         // If turning off, simply update
//         if (isCurrentlyActive) {
//             setBargainingDetails(updatedBargainingDetails);
//             localStorage.setItem('bargainingDetails', JSON.stringify(updatedBargainingDetails));
//             return;
//         }

//         // If turning on, check active count
//         const newActiveCount = Object.values(updatedBargainingDetails).filter(detail => detail.isActive).length;
//         if (newActiveCount > 10) {
//             alert("Maximum 10 products can be active at a time!");
//             return;
//         }

//         // Update state and localStorage
//         setBargainingDetails(updatedBargainingDetails);
//         localStorage.setItem('bargainingDetails', JSON.stringify(updatedBargainingDetails));
//     };

//     const handleSetMinPrice = async (id, defaultPrice, quantity) => {
//         if (quantity <= 0) {
//             alert("Cannot set minimum price for products with no inventory!");
//             return;
//         }

//         // Check if min price is already locked
//         if (lockedMinPrices[id]) {
//             alert("Minimum price is currently locked. Delete it first to set a new price.");
//             return;
//         }

//         // Check the current number of active products
//         const currentActiveCount = Object.values(bargainingDetails).filter(detail => detail.isActive).length;

//         // If already at max active products and this product is not active
//         if (currentActiveCount >= 10 && !bargainingDetails[id]?.isActive) {
//             alert("Maximum 10 products can be active at a time!");
//             return;
//         }

//         const newPrice = prompt("Set minimum price:");
//         if (newPrice && !isNaN(newPrice)) {
//             const numericPrice = parseFloat(newPrice);
//             const numericDefaultPrice = parseFloat(defaultPrice);

//             if (numericPrice >= numericDefaultPrice) {
//                 alert("Minimum price must be less than the default price!");
//                 return;
//             }

//             try {
//                 const token = localStorage.getItem("authToken");
//                 const response = await fetch('http://localhost:8000/api/v1/bargaining/set-min-price', {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'Authorization': `Bearer ${token}`
//                     },
//                     body: JSON.stringify({
//                         productId: id,
//                         minPrice: numericPrice
//                     })
//                 });

//                 if (!response.ok) {
//                     throw new Error('Failed to set min price');
//                 }

//                 const result = await response.json();

//                 const updatedBargainingDetails = {
//                     ...bargainingDetails,
//                     [id]: {
//                         ...bargainingDetails[id],
//                         minPrice: result.data.minPrice,
//                         isActive: true  // Automatically set to active
//                     }
//                 };

//                 const updatedLockedMinPrices = {
//                     ...lockedMinPrices,
//                     [id]: true
//                 };

//                 setBargainingDetails(updatedBargainingDetails);
//                 setLockedMinPrices(updatedLockedMinPrices);

//                 localStorage.setItem('bargainingDetails', JSON.stringify(updatedBargainingDetails));
//                 localStorage.setItem('lockedMinPrices', JSON.stringify(updatedLockedMinPrices));

//                 await fetchProducts();
//                 alert("Minimum price set successfully. Product is now active.");

//             } catch (error) {
//                 console.error("Error setting min price:", error);
//                 alert("Failed to set minimum price");
//             }
//         }
//     };

//     const handleDeleteMinPrice = async (id) => {
//         try {
//             const token = localStorage.getItem("authToken");
//             const response = await fetch(`http://localhost:8000/api/v1/bargaining/delete/${id}`, {
//                 method: 'DELETE',
//                 headers: {
//                     'Authorization': `Bearer ${token}`
//                 }
//             });

//             if (!response.ok) {
//                 throw new Error('Failed to delete min price');
//             }

//             const updatedBargainingDetails = {
//                 ...bargainingDetails,
//                 [id]: {
//                     ...bargainingDetails[id],
//                     minPrice: "",
//                     isActive: false
//                 }
//             };

//             const updatedLockedMinPrices = { ...lockedMinPrices };
//             delete updatedLockedMinPrices[id];

//             setBargainingDetails(updatedBargainingDetails);
//             setLockedMinPrices(updatedLockedMinPrices);

//             localStorage.setItem('bargainingDetails', JSON.stringify(updatedBargainingDetails));
//             localStorage.setItem('lockedMinPrices', JSON.stringify(updatedLockedMinPrices));

//             await fetchProducts();
//             alert("Min price reset successfully");

//         } catch (error) {
//             console.error("Error resetting min price:", error);
//             alert("Failed to reset minimum price");
//         }
//     };

//     const filteredProducts = products.filter(product =>
//         Object.values(product).some(value =>
//             String(value).toLowerCase().includes(searchTerm.toLowerCase())
//         )
//     );

//     const totalPages = Math.ceil(filteredProducts.length / entriesPerPage);
//     const startIndex = (currentPage - 1) * entriesPerPage;
//     const currentData = filteredProducts.slice(startIndex, startIndex + entriesPerPage);

//     if (loading) return (
//         <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
//             <Typography>Loading products...</Typography>
//         </Box>
//     );

//     if (error) return (
//         <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
//             <Typography color="error">Error: {error}</Typography>
//         </Box>
//     );

//     return (
//         <Paper className="p-4">
//             <Grid container alignItems="center" sx={{ pt: 2, px: 3 }}>
//                 <Grid item xs>
//                     <Typography variant="h6" sx={{ fontFamily: 'sans-serif', fontWeight: "bold", color: "#344767" }}>
//                         Inventory Individual Product
//                     </Typography>
//                 </Grid>
//                 <Grid item>
//                     <IconButton onClick={handleRefresh} color="primary">
//                         <RefreshCw className={loading ? "animate-spin" : ""} />
//                     </IconButton>
//                 </Grid>
//             </Grid>

//             <div style={{ margin: "20px" }}>
//                 <Grid container spacing={2} alignItems="center">
//                     <Grid item>
//                         <TextField
//                             select
//                             value={entriesPerPage}
//                             onChange={(e) => setEntriesPerPage(Number(e.target.value))}
//                             size="small"
//                             variant="outlined"
//                             sx={{ width: 60 }}
//                         >
//                             {[5, 10, 15].map((num) => (
//                                 <MenuItem key={num} value={num}>
//                                     {num}
//                                 </MenuItem>
//                             ))}
//                         </TextField>
//                     </Grid>
//                     <Grid item>
//                         <Typography variant="body2">Entries per page</Typography>
//                     </Grid>
//                     <Grid item xs />
//                     <Grid item>
//                         <TextField
//                             label="Search here"
//                             variant="outlined"
//                             size="small"
//                             value={searchTerm}
//                             onChange={(e) => setSearchTerm(e.target.value)}
//                             sx={{ width: 300 }}
//                         />
//                     </Grid>
//                 </Grid>
//             </div>

//             <TableContainer component={Paper} sx={{ boxShadow: 'none', borderRadius: '0' }}>
//                 <Table>
//                     <TableHead>
//                         <TableRow>
//                             <TableCell>ID</TableCell>
//                             <TableCell>Default Price</TableCell>
//                             <TableCell>Status</TableCell>
//                             <TableCell>Category</TableCell>
//                             <TableCell>Product</TableCell>
//                             <TableCell>Quantity</TableCell>
//                             <TableCell>Behavior</TableCell>
//                             <TableCell>Min Price</TableCell>
//                             <TableCell>Actions</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {currentData.map((item) => (
//                             <TableRow key={item.id}>
//                                 <TableCell>{item.id}</TableCell>
//                                 <TableCell>{item.price}</TableCell>
//                                 <TableCell>
//                                     <Switch
//                                         checked={bargainingDetails[item.id]?.isActive || false}
//                                         onChange={() => handleToggleActive(item.id)}
//                                         disabled={item.quantity <= 0}
//                                     />
//                                 </TableCell>
//                                 <TableCell>{item.category}</TableCell>
//                                 <TableCell>{item.product}</TableCell>
//                                 <TableCell>{item.quantity}</TableCell>
//                                 <TableCell>Normal</TableCell>
//                                 <TableCell>
//                                     <Button
//                                         variant="outlined"
//                                         size="small"
//                                         onClick={() => handleSetMinPrice(item.id, item.defaultPrice, item.quantity)}
//                                         disabled={item.quantity <= 0 || lockedMinPrices[item.id]}
//                                     >
//                                         {bargainingDetails[item.id]?.minPrice && lockedMinPrices[item.id]
//                                             ? `$${bargainingDetails[item.id].minPrice}`
//                                             : "Set min price"}
//                                     </Button>
//                                 </TableCell>
//                                 <TableCell>
//                                     <Button
//                                         variant="contained"
//                                         color="error"
//                                         size="small"
//                                         onClick={() => handleDeleteMinPrice(item.id)}
//                                         disabled={!lockedMinPrices[item.id]}
//                                     >
//                                         Delete
//                                     </Button>
//                                 </TableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </TableContainer>

//             <Grid container justifyContent="space-between" alignItems="center" p={4}>
//                 <Grid item>
//                     <Typography variant="body2" color="textSecondary">
//                         Showing {startIndex + 1} to {Math.min(startIndex + entriesPerPage, filteredProducts.length)} of {filteredProducts.length} entries
//                     </Typography>
//                 </Grid>
//                 <Grid item>
//                     <Pagination
//                         count={totalPages}
//                         page={currentPage}
//                         onChange={(e, value) => setCurrentPage(value)}
//                         color="primary"
//                     />
//                 </Grid>
//             </Grid>
//         </Paper>
//     );
// };

// export default InventoryTable;