export interface Category {
  id: number;
  name: string;
  image: string;
  content: string;
}

export interface CategoryProps {
  item?: Category;
  onPress?: (item: Category) => void;
}
