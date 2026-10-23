import { Form, InputGroup, Button } from 'react-bootstrap';

import { useState } from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { setProductType } from '../../features/inventory/slice';

const ProductFilterBar = () => {
  const [search, setSearch] = useState('');
  const dispatch = useAppDispatch();

  const handleSearch = () => {
    dispatch(setProductType(search));
  };

  const clearSearch = () => {
    dispatch(setProductType(null));
    setSearch('');
  };

  return (
    <InputGroup className="">
      <Form.Control
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        placeholder="Search by product type"
        aria-label="Recipient's username with two button addons"
      />
      <Button onClick={handleSearch} variant="outline-primary">
        Search
      </Button>
      <Button onClick={clearSearch} variant="outline-danger">
        Clear
      </Button>
    </InputGroup>
  );
};

export default ProductFilterBar;
