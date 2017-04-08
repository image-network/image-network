package image_network;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;

public class TXTParser {

	public TXTParser() {
		
	}
	
	public ArrayList<Pair<String, Double>> parse(String filename) {
		ArrayList<Pair<String, Double>> results = new ArrayList<Pair<String, Double>>();
		BufferedReader br = null;
		try {
			br = new BufferedReader(new FileReader(filename));
			
			br.close();
		} catch (IOException ioe) {
			System.out.println("ioe [TXTParser]: " + ioe.getMessage());
		}
		return results;
	}
	
}
