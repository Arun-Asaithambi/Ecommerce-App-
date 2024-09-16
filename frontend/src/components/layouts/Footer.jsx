import Card from 'react-bootstrap/Card';

export default function Footer(){
    return (
    <Card >
      <Card.Body>
          <footer className="blockquote-footer p-3 text-center">
            This Website is Created by <cite title="Source Title"> ~ Arun Asaithambi</cite>
          </footer>
      </Card.Body>
    </Card>
    )
}