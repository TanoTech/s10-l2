import React, { useState } from 'react';
import horror from '../data/horror.json';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './DisplayBooks.css';
import SingleBook from './SingleBook';
import BookComments from './BookComment';

const HorrorBook = ({ searchQuery }) => {
    const [displayCount, setDisplayCount] = useState(20);
    const [activeBookId, setActiveBookId] = useState(null);

    const handleChange = (e) => {
        setDisplayCount(e.target.value);
    };

    const displayedBooks = horror.slice(0, displayCount);
    const filteredHorror = searchQuery ? displayedBooks.filter((libro) =>
        libro.title.toLowerCase().includes(searchQuery.toLowerCase())) : displayedBooks;

    return (
        <main className='d-flex'>
            <Container>
                <h1 as={Link} to='/horror'>Horror</h1>
                <Form>
                    <Form.Group>
                        <Form.Label>Numero di libri da visualizzare</Form.Label>
                        <Form.Control className='displayBook' as="select" value={displayCount} onChange={handleChange}>
                            <option value="20">20</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                            <option value="200">200</option>
                        </Form.Control>
                    </Form.Group>
                </Form>
                <Row>
                    {filteredHorror.map((libro, index) => (
                        <Col key={index} >
                            <SingleBook book={libro} onSelectBook={() => setActiveBookId(libro.asin)} />
                        </Col>
                    ))}
                </Row>
            </Container>
            <BookComments bookId={activeBookId} />
        </main>
    );
};

export default HorrorBook;