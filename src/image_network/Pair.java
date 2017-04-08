package image_network;

// Generic Pair class for key, value pair operations
public class Pair<T,U> {
	
	private T a;
	private U b;
	
	public Pair(T a, U b) {
		this.a = a;
		this.b = b;
	}
	
	public T first() { return a; }
	public U second() { return b; }
	
	public void setFirst(T a) {
		this.a = a;
	}
	
	public void setSecond(U b) {
		this.b = b;
	}
		
}
