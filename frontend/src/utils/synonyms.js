// Master Synonym Dictionary for Smart Search and SEO
// Map base subcategories/keywords to an array of regional variations.

export const synonymDictionary = {
  mantap: [
    'mantapa',
    'mandir',
    'devara mane',
    'pooja mane',
    'devara gudi',
    'devara kone',
    'swami mane',
    'poojai arai',
    'swami arai',
    'pooja gadi',
    'pooja mandiram',
    'pooja muri',
    'devhara',
    'devghar',
    'ghar mandir',
    'puja ghar',
    'dev sthan',
    'devasthan',
    'thakur ghor',
    'thakur ghara',
    'namghar',
    'puja kaksh',
    'mandir room',
    'devalaya',
    'aalaya',
    'puja kotha',
    'dev ghar',
    'home mandir',
    'hindu shrine',
    'home temple',
    'prayer room',
    'family shrine',
    'sanggah',
    'spirit house',
    'shrine'
  ]
};

/**
 * Checks if a search query matches any synonyms of a base term.
 * If it does, returns the base term to include in the search parameters.
 */
export const getBaseTermForSynonym = (searchQuery) => {
  const query = searchQuery.toLowerCase();
  
  for (const [baseTerm, synonyms] of Object.entries(synonymDictionary)) {
    if (baseTerm.includes(query) || synonyms.some(syn => syn.includes(query) || query.includes(syn))) {
      return baseTerm;
    }
  }
  return null;
};

/**
 * Returns a flat string of comma-separated synonyms for SEO meta injection
 */
export const getSEOKeywords = (subcategory) => {
  if (!subcategory) return '';
  const term = subcategory.toLowerCase().trim();
  
  if (synonymDictionary[term]) {
    // Return original subcategory + all synonyms joined
    return [term, ...synonymDictionary[term]].join(', ');
  }
  
  return term;
};
