package image_network;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;

public class TXTParser {
	
	public ArrayList<Pair<String, Double>> parse(String filename) {
		ArrayList<Pair<String, Double>> results = new ArrayList<Pair<String, Double>>();
		BufferedReader br = null;
		try {
			br = new BufferedReader(new FileReader(filename));
			String line = br.readLine();
			while (line != null) {
				String first = "";
				Double second = -1.0;
				String[] split = line.split(" ");
				for (int i = 0; i < split.length; i++) {
					if (split[i].contains(".")) {
						second = Double.parseDouble(split[i]);
					} else {
						if (first != "") {
							first += " " + split[i];
						} else {
							first += split[i];
						}
					}
				}
				results.add(new Pair<String, Double>(first, second));
				line = br.readLine();
			}
		} catch (IOException ioe) {
			System.out.println("ioe [TXTParser]: " + ioe.getMessage());
		} finally {
			if (br != null) {
				try {
					br.close();
				} catch (IOException ioe) {
					System.out.println("ioe [TXTParser]: " + ioe.getMessage());
				}
			}
		}
		return results;
	}
	
	
//	public static void main(String[] args) {
//		TXTParser p = new TXTParser();
//		ArrayList<Pair<String, Double>> results = p.parse("MachineLearning/classified/text_score.txt");
//		for (Pair<String, Double> pair : results) {
//			System.out.println("(" + pair.first() + ", " + pair.second() + ")");
//		}
//	}
	
}
