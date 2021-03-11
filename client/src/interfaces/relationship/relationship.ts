type RelationshipName = 'Single' | 'In relationship' | 'Married' | 'Divorced';

export default interface Relationship {
  id: number;
  name: RelationshipName;
}
