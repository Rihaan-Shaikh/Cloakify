import { createRoot } from 'react-dom/client';
import OptionsApp from './OptionsApp';
import '../index.css';

const container = document.getElementById('options-root');
if (!container) {
  throw new Error('Failed to find the options-root element');
}

const root = createRoot(container);
root.render(<OptionsApp />);
