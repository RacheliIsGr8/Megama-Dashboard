/** שלב בניווט הצד של מסך ההשוואה */
export interface TzadStepper {
  id: string;
  /** מזהה אלמנט לגלילה (ללא #) */
  targetId: string;
  koteret: string;
  /** מפתח אייקון לתצוגה */
  sugIcon:
    | 'pratim'
    | 'tziyunim'
    | 'haskala'
    | 'hachsharot'
    | 'minuyim'
    | 'amitim'
    | 'kefifim'
    | 'haarchot';
}
