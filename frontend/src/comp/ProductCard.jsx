import React, { useState } from 'react';
import {
    Box, Heading, HStack, Image, Text,
    Input, Button
} from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode.jsx";
import { FiEdit, FiTrash } from "react-icons/fi";
import { useProductStore } from "@/store/product.js";
import { toast } from 'sonner';
import Modal from 'react-modal';

// Indique à react-modal ton élément racine
Modal.setAppElement('#root');

const ProductCard = ({ product }) => {
    const textColor = useColorModeValue("gray.800", "white");
    const bg = useColorModeValue("white", "gray.800");
    const { deleteProduct, updateProduct } = useProductStore();

    // 🗑️ Suppression
    const handleDeleteProduct = async (pid) => {
        const confirmed = window.confirm("Are you sure you want to delete this product?");
        if (!confirmed) {
            toast.info("Deletion cancelled.");
            return;
        }
        const { success, message } = await deleteProduct(pid);
        success
            ? toast.success(message || "Product deleted successfully!")
            : toast.error(message || "Error deleting the product.");
    };

    // 🔄 Édition via React Modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form, setForm] = useState({
        name: product.name,
        price: product.price,
        image: product.image
    });

    const handleUpdateProduct = async (e) => {
        e.preventDefault();
        const { success, message } = await updateProduct(product._id, form);
        if (success) {
            toast.success(message || "Product updated!");
            setIsModalOpen(false);
        } else {
            toast.error(message || "Error updating product.");
        }
    };

    return (
        <>
            <Box
                shadow="lg"
                rounded="lg"
                overflow="hidden"
                transition="all 0.3s"
                _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
                bg={bg}
            >
                <Image
                    src={product.image}
                    alt={product.name}
                    h={48}
                    w="full"
                    objectFit="cover"
                />
                <Box p={4}>
                    <Heading as="h3" size="md" mb={2}>
                        {product.name}
                    </Heading>
                    <Text fontWeight="bold" fontSize="xl" color={textColor} mb={4}>
                        ${product.price}
                    </Text>

                    <HStack spacing={2}>
                        {/* Bouton Éditer */}
                        <Box
                            as={FiEdit}
                            boxSize={6}
                            cursor="pointer"
                            color="blue.500"
                            onClick={() => setIsModalOpen(true)}
                        />
                        {/* Bouton Supprimer */}
                        <Box
                            as={FiTrash}
                            boxSize={6}
                            cursor="pointer"
                            color="red.500"
                            onClick={() => handleDeleteProduct(product._id)}
                        />
                    </HStack>
                </Box>
            </Box>

            {/* --- Modal de mise à jour --- */}
            <Modal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                style={{
                    overlay: { backgroundColor: 'rgba(0,0,0,0.5)' },
                    content: {
                        inset: 'auto',
                        margin: 'auto',
                        padding: '2rem',
                        borderRadius: '8px',
                        maxWidth: '400px',
                        background: bg
                    },
                }}
            >
                <Heading size="md" mb={4}>Edit Product</Heading>
                <Box as="form" onSubmit={handleUpdateProduct}>
                    <Box mb={3}>
                        <Input
                            placeholder="Name"
                            value={form.name}
                            onChange={e => setForm({ ...form, name: e.target.value })}
                        />
                    </Box>
                    <Box mb={3}>
                        <Input
                            placeholder="Price"
                            value={form.price}
                            onChange={e => setForm({ ...form, price: e.target.value })}
                        />
                    </Box>
                    <Box mb={3}>
                        <Input
                            placeholder="Image URL"
                            value={form.image}
                            onChange={e => setForm({ ...form, image: e.target.value })}
                        />
                    </Box>
                    <HStack justify="flex-end" spacing={3}>
                        <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button colorScheme="blue" type="submit">
                            Save
                        </Button>
                    </HStack>
                </Box>
            </Modal>
        </>
    );
};

export default ProductCard;
