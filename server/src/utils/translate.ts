import axios from 'axios';

interface TranslateRequest {
  q: string; 
  target: string; 
  source?:string
}

interface TranslateResponse {
  data: {
    translations: Array<{
      translatedText: string;  
    }>;
  };
}

export const translateText = async (text: string, targetLang: string, sourceLang: string = 'en'): Promise<string> => {
  const requestBody: TranslateRequest = {
    q: text,
    target: targetLang,
    source: sourceLang,
  };

  try {
    const response = await axios.post<TranslateResponse>(
      `https://translation.googleapis.com/language/translate/v2?key=${process.env.GOOGLE_TRANSLATE_API_TOKEN}`,
      requestBody,
    );


    const translatedText = response.data.data.translations[0]?.translatedText;
    if (!translatedText) {
      throw new Error('Translation failed or no translation returned.');
    }
    return translatedText;

  } catch (error) {
    console.error('Translation error:', error);
    throw new Error('Failed to translate text');
  }
};
