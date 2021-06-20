import { Category } from './category';

type Topic = Category;

export interface TopicProps {
  item?: Topic;
  onPress?: (item: Topic) => void;
}
